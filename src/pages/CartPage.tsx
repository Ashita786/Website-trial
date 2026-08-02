import { ArrowLeft, Trash2, ShoppingBag, Tag, Truck, Shield, Star } from 'lucide-react'
import type { CartItem } from '../App'

type CartPageProps = {
  cart: CartItem[]
  onUpdateQuantity: (productId: number, qty: number) => void
  onRemove: (productId: number) => void
  onContinueShopping: () => void
}

const SUGGESTED = [
  {
    id: 99,
    name: 'Dream Glow Drops',
    price: 42,
    image: 'https://images.unsplash.com/photo-1783472960090-4ae8e9b3efd9?w=120&h=120&fit=crop&auto=format',
    rating: 4.7,
  },
  {
    id: 98,
    name: 'Hyaluronic Boost',
    price: 34,
    image: 'https://images.unsplash.com/photo-1774772569470-b41fadf7eb55?w=120&h=120&fit=crop&auto=format',
    rating: 4.8,
  },
  {
    id: 97,
    name: 'Precision Liner',
    price: 18,
    image: 'https://images.unsplash.com/photo-1617176892739-98fc49fdcbe7?w=120&h=120&fit=crop&auto=format',
    rating: 4.9,
  },
]

const PAYMENT_METHODS = ['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay', 'Klarna']

const GUARANTEES = [
  { icon: '↩', label: '30-Day Returns' },
  { icon: '🌱', label: 'Carbon Neutral' },
  { icon: '🐰', label: 'Cruelty-Free' },
  { icon: '✦', label: 'Clean Certified' },
]

export default function CartPage({ cart, onUpdateQuantity, onRemove, onContinueShopping }: CartPageProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal >= 50 ? 0 : 6.99
  const discount = subtotal > 0 ? subtotal * 0.1 : 0
  const total = subtotal - discount + shipping
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0)
  const freeShippingProgress = Math.min((subtotal / 50) * 100, 100)

  return (
    <main className="pt-16 min-h-screen" style={{ background: '#08080E' }}>
      {/* Ambient orbs */}
      <div
        className="fixed top-0 right-[-20%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(201,79,255,0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255,61,127,0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={onContinueShopping}
            className="flex items-center gap-2 text-[13px] font-semibold transition-colors hover:text-white group"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
            Continue Shopping
          </button>
          <div className="h-4 w-px" style={{ background: 'rgba(255,255,255,0.12)' }} />
          <h1
            className="text-[26px] md:text-[32px] font-extrabold text-white tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Your Bag
          </h1>
          {itemCount > 0 && (
            <span
              className="px-3 py-1 rounded-full text-[11px] font-black text-white"
              style={{ background: 'linear-gradient(135deg, #C94FFF, #FF3D7F)' }}
            >
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>

        {cart.length === 0 ? (
          /* ── EMPTY STATE ─────────────────────────────── */
          <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(201,79,255,0.1)',
                border: '1px solid rgba(201,79,255,0.2)',
              }}
            >
              <ShoppingBag size={36} color="#C94FFF" strokeWidth={1.5} />
            </div>
            <div>
              <h2
                className="text-[22px] font-extrabold text-white mb-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Your bag is empty
              </h2>
              <p className="text-[14px]" style={{ color: 'rgba(255,255,255,0.42)' }}>
                Nothing here yet — let's change that.
              </p>
            </div>
            <button
              onClick={onContinueShopping}
              className="px-9 py-4 rounded-full text-[13px] font-extrabold text-white transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #C94FFF, #FF3D7F)',
                boxShadow: '0 0 30px rgba(201,79,255,0.35)',
              }}
            >
              Start Shopping
            </button>

            {/* Suggested */}
            <div className="mt-10 w-full max-w-lg">
              <p className="text-[11px] font-black tracking-[0.14em] uppercase mb-5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                You might like
              </p>
              <div className="flex gap-4 justify-center">
                {SUGGESTED.map(s => (
                  <div
                    key={s.id}
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                  >
                    <div
                      className="w-20 h-20 rounded-xl overflow-hidden bg-[#0E0E18]"
                      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="text-[11px] font-semibold text-white text-center leading-tight max-w-[70px]">{s.name}</p>
                    <p className="text-[12px] font-extrabold" style={{ color: '#C94FFF' }}>${s.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ── CART CONTENT ────────────────────────────── */
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            {/* Left: items */}
            <div className="flex flex-col gap-4">
              {/* Free shipping bar */}
              <div
                className="p-4 rounded-2xl"
                style={{
                  background: subtotal >= 50
                    ? 'rgba(0,200,117,0.06)'
                    : 'rgba(0,212,255,0.05)',
                  border: subtotal >= 50
                    ? '1px solid rgba(0,200,117,0.2)'
                    : '1px solid rgba(0,212,255,0.15)',
                }}
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <Truck size={13} color={subtotal >= 50 ? '#00C875' : '#00D4FF'} />
                  <p
                    className="text-[12px] font-bold"
                    style={{ color: subtotal >= 50 ? '#00C875' : '#00D4FF' }}
                  >
                    {subtotal >= 50
                      ? "You've unlocked free shipping! 🎉"
                      : `Add $${(50 - subtotal).toFixed(2)} more for free shipping`}
                  </p>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${freeShippingProgress}%`,
                      background: subtotal >= 50
                        ? 'linear-gradient(90deg, #00C875, #00A060)'
                        : 'linear-gradient(90deg, #00D4FF, #0099CC)',
                    }}
                  />
                </div>
              </div>

              {/* Cart items */}
              {cart.map(item => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 rounded-2xl group"
                  style={{
                    background: 'rgba(255,255,255,0.035)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,79,255,0.2)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
                  }}
                >
                  {/* Product image */}
                  <div className="w-24 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-[#0E0E18]">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between gap-3 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p
                          className="text-[9px] font-black tracking-[0.14em] uppercase mb-1"
                          style={{ color: 'rgba(255,255,255,0.3)' }}
                        >
                          {item.product.category}
                        </p>
                        <h3
                          className="text-[14px] font-extrabold text-white leading-snug"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {item.product.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Star size={9} fill="#FFD700" color="#FFD700" />
                          <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                            {item.product.rating} ({item.product.reviews.toLocaleString()} reviews)
                          </span>
                        </div>
                      </div>
                      {/* Delete */}
                      <button
                        onClick={() => onRemove(item.product.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                        style={{
                          background: 'rgba(255,61,127,0.1)',
                          border: '1px solid rgba(255,61,127,0.22)',
                        }}
                        title="Remove item"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 size={12} color="#FF3D7F" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      {/* Quantity stepper */}
                      <div
                        className="flex items-center rounded-full overflow-hidden"
                        style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                      >
                        <button
                          className="w-9 h-9 flex items-center justify-center text-base font-bold transition-colors hover:bg-white/12 text-white"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          style={{ color: item.quantity === 1 ? '#FF3D7F' : 'white' }}
                          aria-label={item.quantity === 1 ? `Remove ${item.product.name}` : `Decrease quantity of ${item.product.name}`}
                        >
                          {item.quantity === 1 ? (
                            <Trash2 size={12} color="#FF3D7F" />
                          ) : (
                            '−'
                          )}
                        </button>
                        <span className="w-9 text-center text-[13px] font-extrabold text-white">
                          {item.quantity}
                        </span>
                        <button
                          className="w-9 h-9 flex items-center justify-center text-base font-bold transition-colors hover:bg-white/12 text-white"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.product.name}`}
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-[16px] font-extrabold text-white">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                            ${item.product.price} × {item.quantity}
                          </p>
                        )}
                        {item.product.originalPrice && (
                          <p className="text-[10px]" style={{ color: '#C94FFF' }}>
                            Save ${(item.product.originalPrice - item.product.price) * item.quantity}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* You might also like */}
              <div
                className="p-5 rounded-2xl mt-2"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <p className="text-[11px] font-black tracking-[0.14em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Complete your routine
                </p>
                <div className="flex gap-4 overflow-x-auto pb-1">
                  {SUGGESTED.map(s => (
                    <div key={s.id} className="flex-shrink-0 flex flex-col gap-2 cursor-pointer group">
                      <div
                        className="w-16 h-16 rounded-xl overflow-hidden bg-[#0E0E18]"
                        style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <img
                          src={s.image}
                          alt={s.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="text-[10px] font-bold text-white max-w-[60px] leading-tight">{s.name}</p>
                      <div className="flex items-center gap-1">
                        <Star size={8} fill="#FFD700" color="#FFD700" />
                        <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.rating}</span>
                      </div>
                      <p className="text-[11px] font-extrabold" style={{ color: '#C94FFF' }}>${s.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Order summary */}
            <div className="flex flex-col gap-4">
              {/* Promo code */}
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.035)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p className="text-[11px] font-black tracking-[0.12em] uppercase mb-3 flex items-center gap-2 text-white">
                  <Tag size={12} color="#C94FFF" /> Promo Code
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    aria-label="Promo code"
                    className="flex-1 px-4 py-2.5 rounded-full text-[13px] outline-none text-white placeholder-white/25 border transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      borderColor: 'rgba(255,255,255,0.12)',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#C94FFF')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                  />
                  <button
                    className="px-5 py-2.5 rounded-full text-[12px] font-extrabold text-white whitespace-nowrap transition-all hover:scale-105"
                    style={{
                      background: 'rgba(201,79,255,0.18)',
                      border: '1px solid rgba(201,79,255,0.3)',
                    }}
                  >
                    Apply
                  </button>
                </div>
                <p className="text-[11px] mt-2.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Try{' '}
                  <span className="font-bold cursor-pointer" style={{ color: '#C94FFF' }}>
                    GLOW15
                  </span>{' '}
                  for 15% off your first order
                </p>
              </div>

              {/* Summary card */}
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.035)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <h2
                  className="text-[17px] font-extrabold text-white mb-6"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Order Summary
                </h2>

                <div className="flex flex-col gap-3.5">
                  <div className="flex justify-between text-[13px]">
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                    </span>
                    <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>Discount (GLOW15)</span>
                    <span className="font-bold" style={{ color: '#C94FFF' }}>
                      −${discount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>Shipping</span>
                    <span className="font-bold text-white">
                      {shipping === 0 ? (
                        <span style={{ color: '#00C875' }}>FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div
                    className="flex justify-between pt-4 mt-1"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <span className="text-[15px] font-extrabold text-white">Total</span>
                    <div className="text-right">
                      <span className="text-[22px] font-black text-white">${total.toFixed(2)}</span>
                      {discount > 0 && (
                        <p className="text-[11px]" style={{ color: '#C94FFF' }}>
                          You save ${discount.toFixed(2)}!
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  className="w-full mt-6 py-4 rounded-full text-[14px] font-extrabold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #C94FFF, #FF3D7F)',
                    boxShadow: '0 0 36px rgba(201,79,255,0.32)',
                  }}
                >
                  Checkout → ${total.toFixed(2)}
                </button>

                <div className="flex items-center justify-center gap-2 mt-4">
                  <Shield size={11} color="rgba(255,255,255,0.28)" />
                  <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
                    Secure checkout · 256-bit SSL encrypted
                  </p>
                </div>
              </div>

              {/* Payment methods */}
              <div
                className="p-4 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <p className="text-[10px] font-bold tracking-widest text-center mb-3 uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>
                  We accept
                </p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {PAYMENT_METHODS.map(p => (
                    <span
                      key={p}
                      className="text-[9px] font-extrabold px-2.5 py-1.5 rounded-lg tracking-wide"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        color: 'rgba(255,255,255,0.42)',
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-3">
                {GUARANTEES.map(g => (
                  <div
                    key={g.label}
                    className="flex items-center gap-2 p-3 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <span className="text-sm">{g.icon}</span>
                    <span className="text-[11px] font-semibold" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {g.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
