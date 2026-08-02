import { useState } from 'react'
import { ShoppingBag, Search, Menu, X } from 'lucide-react'

type NavbarProps = {
  cartCount: number
  onNavigate: (page: 'home' | 'cart') => void
  currentPage: 'home' | 'cart'
}

const NAV_LINKS = ['Skincare', 'Makeup', 'Lips', 'Eyes', 'New In']

export default function Navbar({ cartCount, onNavigate, currentPage }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(8, 8, 14, 0.75)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => { onNavigate('home'); setMenuOpen(false) }}
          className="flex items-center gap-2.5"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #C94FFF, #FF3D7F)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L8.5 5H13L9.5 7.5L11 11.5L7 9L3 11.5L4.5 7.5L1 5H5.5L7 1Z" fill="white" />
            </svg>
          </div>
          <span
            className="text-[20px] font-extrabold tracking-tight text-white"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            GlowUp
          </span>
        </button>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <button
              key={link}
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}
            aria-label="Search"
          >
            <Search size={15} />
          </button>
          <button
            className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all"
            style={{
              background: currentPage === 'cart'
                ? 'linear-gradient(135deg, #C94FFF, #FF3D7F)'
                : 'rgba(255,255,255,0.06)',
              color: 'white',
              boxShadow: currentPage === 'cart' ? '0 0 20px rgba(201,79,255,0.4)' : 'none',
            }}
            onClick={() => onNavigate('cart')}
            aria-label="Open bag"
          >
            <ShoppingBag size={15} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                style={{ background: '#FF3D7F' }}
              >
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-5 py-4 flex flex-col gap-1"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {NAV_LINKS.map(link => (
            <button
              key={link}
              className="text-left py-3 text-sm font-medium border-b"
              style={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.05)' }}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
