import { useState } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'

export type Product = {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  tag?: string
  rating: number
  reviews: number
}

export type CartItem = {
  product: Product
  quantity: number
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Aura Glow Serum',
    category: 'Skincare',
    price: 38,
    originalPrice: 52,
    image: 'https://images.unsplash.com/photo-1763986668655-413d55a24f6a?w=500&h=660&fit=crop&auto=format',
    tag: 'BESTSELLER',
    rating: 4.9,
    reviews: 2847,
  },
  {
    id: 2,
    name: 'Velvet Matte Lip',
    category: 'Lips',
    price: 22,
    image: 'https://images.unsplash.com/photo-1643168343279-3f93c2e592ef?w=500&h=660&fit=crop&auto=format',
    tag: 'NEW DROP',
    rating: 4.8,
    reviews: 1203,
  },
  {
    id: 3,
    name: 'Soft Focus Foundation',
    category: 'Face',
    price: 45,
    image: 'https://images.unsplash.com/photo-1512207724313-a4e675ec79ab?w=500&h=660&fit=crop&auto=format',
    tag: 'VIRAL',
    rating: 4.7,
    reviews: 5621,
  },
  {
    id: 4,
    name: 'Glass Skin Essence',
    category: 'Skincare',
    price: 56,
    originalPrice: 72,
    image: 'https://images.unsplash.com/photo-1781948237644-4bb872b37c79?w=500&h=660&fit=crop&auto=format',
    rating: 4.9,
    reviews: 893,
  },
  {
    id: 5,
    name: 'Hyaluronic Boost',
    category: 'Skincare',
    price: 34,
    image: 'https://images.unsplash.com/photo-1774772569470-b41fadf7eb55?w=500&h=660&fit=crop&auto=format',
    tag: 'FAN FAV',
    rating: 4.8,
    reviews: 3410,
  },
  {
    id: 6,
    name: 'Satin Blush Duo',
    category: 'Face',
    price: 29,
    image: 'https://images.unsplash.com/photo-1657369278662-4f1258bd406a?w=500&h=660&fit=crop&auto=format',
    rating: 4.6,
    reviews: 748,
  },
  {
    id: 7,
    name: 'Dream Glow Drops',
    category: 'Skincare',
    price: 42,
    originalPrice: 55,
    image: 'https://images.unsplash.com/photo-1783472960090-4ae8e9b3efd9?w=500&h=660&fit=crop&auto=format',
    tag: 'SALE',
    rating: 4.7,
    reviews: 1876,
  },
  {
    id: 8,
    name: 'Precision Liner',
    category: 'Eyes',
    price: 18,
    image: 'https://images.unsplash.com/photo-1617176892739-98fc49fdcbe7?w=500&h=660&fit=crop&auto=format',
    tag: 'NEW DROP',
    rating: 4.9,
    reviews: 2234,
  },
]

export default function App() {
  const [page, setPage] = useState<'home' | 'cart'>('home')
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId: number, qty: number) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(item => item.product.id !== productId))
    } else {
      setCart(prev =>
        prev.map(item =>
          item.product.id === productId ? { ...item, quantity: qty } : item
        )
      )
    }
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen" style={{ background: '#08080E' }}>
      <Navbar cartCount={cartCount} onNavigate={setPage} currentPage={page} />
      {page === 'home' ? (
        <HomePage
          products={PRODUCTS}
          onAddToCart={addToCart}
          onNavigateToCart={() => setPage('cart')}
        />
      ) : (
        <CartPage
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onContinueShopping={() => setPage('home')}
        />
      )}
    </div>
  )
}
