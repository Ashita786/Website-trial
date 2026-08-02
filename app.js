/* FoodVibe — interactions
   Mirrors the React state in the Figma Make source: theme, search tabs, guest
   stepper, cuisine chips, favourites, mood picker, mobile nav. Plus a couple of
   things React got from libraries (scroll reveal, live countdowns). */

(function () {
  "use strict";

  /* ── Theme ──────────────────────────────────────────────────────────────── */

  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");
  var themeIcon = document.getElementById("theme-icon").querySelector("use");

  function applyTheme(dark) {
    document.body.classList.toggle("dark", dark);
    root.classList.toggle("dark", dark);
    themeIcon.setAttribute("href", dark ? "#i-sun" : "#i-moon");
    themeBtn.setAttribute("aria-pressed", String(dark));
  }

  var stored = null;
  try { stored = localStorage.getItem("foodvibe-theme"); } catch (e) { /* private mode */ }

  applyTheme(
    stored ? stored === "dark"
           : window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  themeBtn.addEventListener("click", function () {
    var dark = !document.body.classList.contains("dark");
    applyTheme(dark);
    try { localStorage.setItem("foodvibe-theme", dark ? "dark" : "light"); } catch (e) { /* ignore */ }
  });

  /* ── Navbar background on scroll ─────────────────────────────────────────── */

  var navbar = document.getElementById("navbar");
  var onScroll = function () {
    navbar.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Single-select groups (search tabs, cuisine chips, mobile nav) ───────── */

  function singleSelect(container, selector, activeClass) {
    if (!container) return;
    container.addEventListener("click", function (e) {
      var btn = e.target.closest(selector);
      if (!btn || !container.contains(btn)) return;
      container.querySelectorAll(selector).forEach(function (el) {
        var isTarget = el === btn;
        el.classList.toggle(activeClass, isTarget);
        if (el.hasAttribute("aria-selected")) {
          el.setAttribute("aria-selected", String(isTarget));
        }
      });
    });
  }

  singleSelect(document.querySelector(".search-tabs"), ".tab", "is-active");
  singleSelect(document.getElementById("category-row"), ".chip", "is-active");
  singleSelect(document.querySelector(".mobile-nav"), ".mnav-item", "is-active");

  /* ── Guest stepper ──────────────────────────────────────────────────────── */

  var guestOut = document.getElementById("guest-count");
  var guests = 2;

  document.querySelectorAll(".step-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      guests = Math.max(1, guests + Number(btn.dataset.step));
      guestOut.textContent = guests;
    });
  });

  /* ── Favourites ─────────────────────────────────────────────────────────── */

  document.querySelectorAll(".fav-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var next = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", String(next));
      btn.setAttribute("aria-label", next ? "Remove from favorites" : "Add to favorites");
    });
  });

  /* ── AI mood picker ─────────────────────────────────────────────────────── */

  var moodRow = document.getElementById("mood-row");
  var results = document.getElementById("ai-results");
  var empty = document.getElementById("ai-empty");
  var moodName = document.getElementById("mood-name");

  moodRow.addEventListener("click", function (e) {
    var btn = e.target.closest(".mood");
    if (!btn) return;

    var wasActive = btn.classList.contains("is-active");
    moodRow.querySelectorAll(".mood").forEach(function (el) {
      el.classList.remove("is-active");
    });

    if (wasActive) {
      results.hidden = true;
      empty.hidden = false;
      return;
    }

    btn.classList.add("is-active");
    moodName.textContent = btn.textContent.trim();
    empty.hidden = true;
    results.hidden = false;
  });

  /* ── Decorative dots in the AI section ──────────────────────────────────── */

  var dots = document.querySelector(".ai-dots");
  for (var i = 0; i < 16; i++) {
    var dot = document.createElement("span");
    dot.style.left = 6 + i * 6 + "%";
    dot.style.top = 10 + (i % 4) * 22 + "%";
    dot.style.animationDelay = (i * 0.18).toFixed(2) + "s";
    dots.appendChild(dot);
  }

  /* ── Flash-deal countdowns ──────────────────────────────────────────────── */

  var timers = Array.prototype.map.call(
    document.querySelectorAll("[data-countdown]"),
    function (el) {
      var p = el.dataset.countdown.split(":").map(Number);
      return { el: el, left: p[0] * 3600 + p[1] * 60 + p[2] };
    }
  );

  function pad(n) { return String(n).padStart(2, "0"); }

  setInterval(function () {
    timers.forEach(function (t) {
      if (t.left <= 0) return;
      t.left--;
      t.el.textContent =
        pad(Math.floor(t.left / 3600)) + ":" +
        pad(Math.floor((t.left % 3600) / 60)) + ":" +
        pad(t.left % 60);
    });
  }, 1000);

  /* ── Scroll reveal (stands in for motion/react viewport animations) ─────── */

  var targets = document.querySelectorAll(
    ".section .section-head, .section .card-rail, .section .occasion-grid, " +
    ".section .deal-grid, .section .chip-row, .section .section-head-center, " +
    ".game-grid > *, .app-banner"
  );

  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

  targets.forEach(function (el) {
    el.classList.add("reveal");
    io.observe(el);
  });
})();
