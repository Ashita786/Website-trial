import { useState } from 'react'
import { ArrowRight, Star, Heart, TrendingUp, Zap, Shield, Recycle, ChevronRight } from 'lucide-react'
import type { Product } from '../App'

type HomePageProps = {
  products: Product[]
  onAddToCart: (product: Product) => void
  onNavigateToCart: () => void
}

const CATEGORIES = ['All', 'Skincare', 'Face', 'Lips', 'Eyes']

const TAG_STYLES: Record<string, string> = {
  BESTSELLER: 'linear-gradient(90deg, #C94FFF, #9B2FE0)',
  'NEW DROP': 'linear-gradient(90deg, #FF3D7F, #FF6B35)',
  VIRAL: 'linear-gradient(90deg, #00D4FF, #0099CC)',
  'FAN FAV': 'linear-gradient(90deg, #FFD700, #FF9A00)',
  SALE: 'linear-gradient(90deg, #FF3D7F, #C94FFF)',
}

const TRUST = [
  'VEGAN & CRUELTY-FREE',
  'DERMATOLOGIST TESTED',
  'CLEAN BEAUTY CERTIFIED',
  'FREE SHIPPING OVER $50',
  '30-DAY GLOW GUARANTEE',
  'CARBON NEUTRAL SHIPPING',
]

const SOCIAL_PROOF_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1674932668403-33398b81c92f?w=50&h=50&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1616926885190-52dbe533292f?w=50&h=50&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1581182815808-b6eb627a8798?w=50&h=50&fit=crop&auto=format',
]

const PROMISES = [
  {
    icon: <Zap size={22} color="#C94FFF" />,
    glow: 'rgba(201,79,255,0.15)',
    title: 'Fast-Track Results',
    desc: 'Clinically proven to work within 7 days. No fillers, no fluff — just real, visible glow backed by dermatology.',
  },
  {
    icon: <Shield size={22} color="#FF3D7F" />,
    glow: 'rgba(255,61,127,0.15)',
    title: '100% Clean Formula',
    desc: 'Zero parabens, sulfates, or synthetic fragrances. Every ingredient is there for a reason — and that reason is your skin.',
  },
  {
    icon: <Recycle size={22} color="#00D4FF" />,
    glow: 'rgba(0,212,255,0.12)',
    title: 'Planet Positive',
    desc: 'Sustainable packaging, carbon-neutral delivery, and 1% of every sale goes directly to global reforestation efforts.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Zara K.',
    handle: '@zarakglow',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format',
    review: "The Aura Glow Serum completely changed my skin. I've never had this many compliments in my life. It literally gave me that glass skin look overnight.",
    product: 'Aura Glow Serum',
    stars: 5,
  },
  {
    name: 'Maya R.',
    handle: '@mayarbeauty',
    avatar: 'https://images.unsplash.com/photo-1674932668403-33398b81c92f?w=80&h=80&fit=crop&auto=format',
    review: "I was skeptical about clean beauty but GlowUp proved me wrong. The Velvet Matte Lip stays on ALL day and the formula is chef's kiss.",
    product: 'Velvet Matte Lip',
    stars: 5,
  },
  {
    name: 'Priya S.',
    handle: '@priyasglow',
    avatar: 'https://images.unsplash.com/photo-1581182815808-b6eb627a8798?w=80&h=80&fit=crop&auto=format',
    review: 'Switched from a high-end department store brand and never looked back. The Soft Focus Foundation is EVERYTHING. 50 shades and they got my undertone right.',
    product: 'Soft Focus Foundation',
    stars: 5,
  },
]

const FOOTER_COLUMNS = [
  { title: 'Shop', links: ['Skincare', 'Makeup', 'Bundles', 'New In', 'Sale'] },
  { title: 'Company', links: ['About', 'Sustainability', 'Careers', 'Press'] },
  { title: 'Help', links: ['FAQ', 'Shipping', 'Returns', 'Contact'] },
]

export default function HomePage({ products, onAddToCart, onNavigateToCart }: HomePageProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set())

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

  const toggleLike = (id: number) => {
    setLiked(prev => {
      const s = new Set(prev)
      if (s.has(id)) {
        s.delete(id)
      } else {
        s.add(id)
      }
      return s
    })
  }

  const handleAdd = (product: Product) => {
    onAddToCart(product)
    setAddedIds(prev => new Set(prev).add(product.id))
    setTimeout(() => {
      setAddedIds(prev => {
        const s = new Set(prev)
        s.delete(product.id)
        return s
      })
    }, 1500)
  }

  return (
    <main className="pt-16 overflow-hidden">
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="relative min-h-[94vh] flex items-center"
        style={{ background: '#08080E' }}
      >
        {/* Gradient orbs */}
        <div
          className="absolute top-[-15%] right-[-5%] w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(201,79,255,0.2) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,61,127,0.16) 0%, transparent 65%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute top-[35%] left-[42%] w-[350px] h-[350px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 65%)',
            filter: 'blur(70px)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 py-20 lg:py-28">
          {/* Left */}
          <div className="flex flex-col justify-center gap-7">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase"
              style={{
                background: 'rgba(201,79,255,0.12)',
                border: '1px solid rgba(201,79,255,0.28)',
                color: '#C94FFF',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C94FFF] animate-pulse" />
              New Summer Collection 2026
            </div>

            {/* Headline */}
            <h1
              className="text-[56px] md:text-[68px] xl:text-[80px] font-extrabold leading-[1.0] tracking-[-0.02em] text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Your Glow,
              <br />
              <span
                style={{
                  background: 'linear-gradient(120deg, #C94FFF 0%, #FF3D7F 55%, #FF6B35 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Amplified.
              </span>
            </h1>

            <p
              className="text-[16px] md:text-[17px] leading-[1.7] max-w-[440px]"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'DM Sans', sans-serif" }}
            >
              Formulated for the next generation. Clean, vegan, and obsession-worthy products that hit different — because your routine should too.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onNavigateToCart}
                className="flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-[14px] text-white transition-all hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #C94FFF, #FF3D7F)',
                  boxShadow: '0 0 36px rgba(201,79,255,0.45)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Shop Now <ArrowRight size={15} />
              </button>
              <button
                className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-[14px] transition-all hover:bg-white/10"
                style={{
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: 'rgba(255,255,255,0.75)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                View Looks <ChevronRight size={15} />
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-5 pt-1">
              <div className="flex -space-x-2.5">
                {SOCIAL_PROOF_AVATARS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Customer"
                    className="w-10 h-10 rounded-full border-[2.5px] object-cover"
                    style={{ borderColor: '#08080E' }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} fill="#FFD700" color="#FFD700" />
                  ))}
                </div>
                <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Loved by{' '}
                  <span className="text-white font-bold">48,000+</span> customers
                </p>
              </div>
            </div>
          </div>

          {/* Right: hero imagery */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Main portrait */}
            <div
              className="relative w-[320px] md:w-[380px] h-[460px] md:h-[540px] rounded-[2rem] overflow-hidden"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 0 80px rgba(201,79,255,0.22)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=760&h=1080&fit=crop&auto=format"
                alt="GlowUp model with radiant skin"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(8,8,14,0.65) 0%, transparent 45%)' }}
              />
              {/* Label on image */}
              <div className="absolute bottom-5 left-5 right-5">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold"
                  style={{
                    background: 'rgba(201,79,255,0.3)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(201,79,255,0.4)',
                    color: '#fff',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C94FFF]" />
                  Glass Skin Collection
                </div>
              </div>
            </div>

            {/* Floating product card */}
            <div
              className="absolute -left-4 lg:-left-14 bottom-16 p-3.5 rounded-2xl flex items-center gap-3 w-[220px] animate-float"
              style={{
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.13)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1763986668655-413d55a24f6a?w=100&h=100&fit=crop&auto=format"
                alt="Aura Glow Serum"
                className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[12px] font-bold text-white leading-tight truncate">Aura Glow Serum</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={9} fill="#FFD700" color="#FFD700" />
                  <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.45)' }}>4.9 · 2.8K</span>
                </div>
                <p className="text-[12px] font-extrabold mt-0.5" style={{ color: '#C94FFF' }}>$38</p>
              </div>
            </div>

            {/* Trending badge */}
            <div
              className="absolute top-8 -right-2 lg:right-0 px-4 py-3 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <TrendingUp size={13} color="#FF3D7F" />
                <p className="text-[12px] font-bold text-white">Trending Now</p>
              </div>
              <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.45)' }}>+234% this week</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────── */}
      <div
        className="py-3.5 overflow-hidden"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.015)',
        }}
      >
        <div className="flex gap-16 animate-marquee whitespace-nowrap w-max">
          {[...TRUST, ...TRUST, ...TRUST, ...TRUST].map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em]"
              style={{ color: 'rgba(255,255,255,0.38)' }}
            >
              <span style={{ color: '#C94FFF' }}>✦</span> {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-6">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p
              className="text-[11px] font-bold tracking-[0.16em] uppercase mb-2"
              style={{ color: '#C94FFF' }}
            >
              ✦ Our Products
            </p>
            <h2
              className="text-[32px] md:text-[38px] font-extrabold text-white tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Built for the Bold
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-[12px] font-bold transition-all"
                style={
                  activeCategory === cat
                    ? {
                        background: 'linear-gradient(135deg, #C94FFF, #FF3D7F)',
                        color: '#fff',
                        boxShadow: '0 0 18px rgba(201,79,255,0.35)',
                      }
                    : {
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.55)',
                      }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filtered.map(product => (
            <div
              key={product.id}
              className="group relative rounded-2xl overflow-hidden flex flex-col cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.035)',
                border: '1px solid rgba(255,255,255,0.07)',
                transition: 'transform 0.28s ease, box-shadow 0.28s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-5px)'
                el.style.boxShadow = '0 20px 50px rgba(201,79,255,0.17)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'none'
              }}
            >
              {/* Image area */}
              <div className="relative overflow-hidden bg-[#0E0E18]" style={{ aspectRatio: '3/4' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />

                {/* Tag */}
                {product.tag && (
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider text-white"
                    style={{ background: TAG_STYLES[product.tag] ?? TAG_STYLES['VIRAL'] }}
                  >
                    {product.tag}
                  </div>
                )}

                {/* Wishlist */}
                <button
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}
                  onClick={e => { e.stopPropagation(); toggleLike(product.id) }}
                  aria-label={liked.has(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                >
                  <Heart
                    size={13}
                    fill={liked.has(product.id) ? '#FF3D7F' : 'none'}
                    color={liked.has(product.id) ? '#FF3D7F' : 'rgba(255,255,255,0.7)'}
                  />
                </button>

                {/* Quick add — slides up on hover */}
                <div
                  className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  <button
                    className="w-full py-3 rounded-xl text-[12px] font-black text-white tracking-wide"
                    style={{
                      background: addedIds.has(product.id)
                        ? 'linear-gradient(135deg, #00C875, #00A060)'
                        : 'linear-gradient(135deg, #C94FFF, #FF3D7F)',
                    }}
                    onClick={() => handleAdd(product)}
                  >
                    {addedIds.has(product.id) ? '✓ Added to Bag' : '+ Add to Bag'}
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-3.5 flex flex-col gap-1.5">
                <p
                  className="text-[9px] font-black tracking-[0.14em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  {product.category}
                </p>
                <p
                  className="text-[13px] font-bold text-white leading-snug"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {product.name}
                </p>
                <div className="flex items-center gap-1">
                  <Star size={10} fill="#FFD700" color="#FFD700" />
                  <span className="text-[11px] font-semibold text-white">{product.rating}</span>
                  <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    ({product.reviews.toLocaleString()})
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[14px] font-extrabold text-white">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-[12px] line-through" style={{ color: 'rgba(255,255,255,0.28)' }}>
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: 'rgba(255,61,127,0.18)', color: '#FF3D7F' }}
                    >
                      SAVE ${product.originalPrice - product.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── VIRAL BANNER ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-14">
        <div
          className="relative rounded-[2rem] overflow-hidden"
          style={{ minHeight: '320px' }}
        >
          <img
            src="https://images.unsplash.com/photo-1512207724313-a4e675ec79ab?w=1400&h=500&fit=crop&auto=format"
            alt="Foundation palette collection"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, rgba(8,8,14,0.92) 0%, rgba(8,8,14,0.5) 60%, transparent 100%)' }}
          />
          <div className="relative z-10 p-10 md:p-14 flex flex-col justify-center h-full" style={{ minHeight: '320px' }}>
            <div
              className="inline-flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest mb-5"
              style={{
                background: 'rgba(255,61,127,0.2)',
                border: '1px solid rgba(255,61,127,0.35)',
                color: '#FF3D7F',
              }}
            >
              🔥 GOING VIRAL
            </div>
            <h2
              className="text-[34px] md:text-[48px] font-extrabold text-white leading-tight max-w-lg mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              The Soft Focus
              <br />
              Foundation Drop
            </h2>
            <p className="text-[14px] mb-8 max-w-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
              50 shades. 48 hours of wear. Zero compromise. The foundation that broke the internet.
            </p>
            <button
              className="flex items-center gap-2 w-fit px-7 py-3.5 rounded-full text-[13px] font-bold text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FF3D7F, #C94FFF)' }}
            >
              Shop Foundation <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY GLOWUP ────────────────────────────────────── */}
      <section
        className="py-20"
        style={{
          background: 'rgba(255,255,255,0.018)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <p className="text-[11px] font-black tracking-[0.16em] uppercase mb-3" style={{ color: '#C94FFF' }}>
              ✦ Our Promise
            </p>
            <h2
              className="text-[32px] md:text-[40px] font-extrabold text-white tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Why GlowUp?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PROMISES.map((item, i) => (
              <div
                key={i}
                className="p-7 rounded-2xl flex flex-col gap-5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: item.glow }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3
                    className="text-[15px] font-bold text-white mb-2"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.48)' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] font-black tracking-[0.16em] uppercase mb-2" style={{ color: '#C94FFF' }}>
              ✦ Reviews
            </p>
            <h2
              className="text-[32px] md:text-[38px] font-extrabold text-white tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Glow Stories
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl flex flex-col gap-4"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={12} fill="#FFD700" color="#FFD700" />
                ))}
              </div>
              <p
                className="text-[13px] leading-[1.8] flex-1"
                style={{ color: 'rgba(255,255,255,0.62)' }}
              >
                "{t.review}"
              </p>
              <div
                className="flex items-center gap-3 pt-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-[12px] font-bold text-white">{t.name}</p>
                  <p className="text-[11px]" style={{ color: '#C94FFF' }}>{t.handle}</p>
                </div>
                <div className="ml-auto">
                  <span
                    className="text-[9px] font-bold px-2 py-1 rounded-full"
                    style={{
                      background: 'rgba(201,79,255,0.12)',
                      color: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {t.product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 pb-20">
        <div
          className="relative rounded-[2rem] overflow-hidden p-10 md:p-16 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(201,79,255,0.13) 0%, rgba(255,61,127,0.1) 100%)',
            border: '1px solid rgba(201,79,255,0.22)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% -20%, rgba(201,79,255,0.22) 0%, transparent 55%)',
            }}
          />
          <div className="relative z-10">
            <p className="text-[11px] font-black tracking-[0.18em] uppercase mb-4" style={{ color: '#C94FFF' }}>
              ✦ Glow Insider
            </p>
            <h2
              className="text-[30px] md:text-[42px] font-extrabold text-white tracking-tight mb-3"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Get 15% Off Your First Order
            </h2>
            <p className="text-[14px] mb-8 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Subscribe for early drops, exclusive offers, and skin routines that actually work.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-[420px] mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address"
                className="flex-1 px-5 py-3.5 rounded-full text-[13px] outline-none text-white placeholder-white/25 bg-white/8 focus:bg-white/12 border border-white/14 focus:border-[#C94FFF] transition-all"
              />
              <button
                className="px-7 py-3.5 rounded-full text-[13px] font-extrabold text-white whitespace-nowrap transition-all hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #C94FFF, #FF3D7F)',
                  boxShadow: '0 0 24px rgba(201,79,255,0.35)',
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer
        className="pb-10"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #C94FFF, #FF3D7F)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1L8.5 5H13L9.5 7.5L11 11.5L7 9L3 11.5L4.5 7.5L1 5H5.5L7 1Z" fill="white" />
                  </svg>
                </div>
                <span
                  className="text-[18px] font-extrabold text-white"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  GlowUp
                </span>
              </div>
              <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.38)' }}>
                Clean beauty for the next generation. Glow different.
              </p>
              <div className="flex gap-2">
                {['IG', 'TK', 'YT', 'X'].map(s => (
                  <button
                    key={s}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors hover:bg-white/15"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {FOOTER_COLUMNS.map(col => (
              <div key={col.title}>
                <h4
                  className="text-[10px] font-black tracking-[0.14em] uppercase mb-5 text-white"
                >
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map(link => (
                    <li key={link}>
                      <button
                        className="text-[13px] transition-colors hover:text-white"
                        style={{ color: 'rgba(255,255,255,0.38)' }}
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
              © 2026 GlowUp Cosmetics. All rights reserved.
            </p>
            <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Made with ✦ for Gen Z
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
