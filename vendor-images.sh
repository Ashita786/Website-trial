#!/usr/bin/env bash
#
# Download the site's photography into assets/img/ and repoint index.html at the
# local copies, so the page works with no network connection.
#
#   ./vendor-images.sh
#
# Re-running is safe: already-downloaded files are skipped, and URLs that have
# already been rewritten are simply not found again. To go back to remote
# images, `git checkout index.html`.

set -euo pipefail

cd "$(dirname "$0")"

HTML=index.html
DIR=assets/img

mkdir -p "$DIR"

urls=$(grep -o 'https://images\.unsplash\.com/[^"]*' "$HTML" | sort -u || true)

if [ -z "$urls" ]; then
  echo "No remote image URLs left in $HTML — nothing to do."
  exit 0
fi

count=0
while IFS= read -r url; do
  # photo-1559339352-11d035aa65de?w=600&h=400... -> photo-1559339352-11d035aa65de-600.jpg
  id=${url##*/}
  slug=${id%%\?*}
  width=$(printf '%s' "$url" | sed -n 's/.*[?&]w=\([0-9]*\).*/\1/p')
  file="$DIR/${slug}-${width:-full}.jpg"

  if [ ! -s "$file" ]; then
    echo "  fetching $(basename "$file")"
    curl -fsSL --retry 3 -o "$file" "$url"
  else
    echo "  have     $(basename "$file")"
  fi

  # Escape & and / for sed, then repoint every occurrence of this exact URL.
  esc_url=$(printf '%s' "$url" | sed 's/[&/]/\\&/g')
  esc_file=$(printf '%s' "$file" | sed 's/[&/]/\\&/g')
  sed -i.bak "s|$esc_url|$esc_file|g" "$HTML"
  rm -f "$HTML.bak"

  count=$((count + 1))
done <<< "$urls"

echo
echo "Vendored $count image(s) into $DIR/ and updated $HTML."
echo "The page now works offline. Photos are from Unsplash — see their licence"
echo "at https://unsplash.com/license before publishing anywhere public."
