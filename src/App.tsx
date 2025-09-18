import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox';
import Cart from './components/Cart';
import PaymentModal from './components/PaymentModal';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentCancel from './components/PaymentCancel';
import About from './components/About';
import Contact from './components/Contact';
import { artworks } from './data/artworks';
import { Artwork } from './components/Gallery';

interface CartItem extends Artwork {
  quantity: number;
}

function App() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'shop' | 'success' | 'cancel'>('shop');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setIsLightboxOpen(true);
  };

  const handleAddToCart = (artwork: Artwork) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === artwork.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === artwork.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...artwork, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    setCartItems([]);
    setCurrentView('success');
  };

  const handlePaymentCancel = () => {
    setCurrentView('cancel');
  };

  const handleBackToShop = () => {
    setCurrentView('shop');
  };

  const handleRetryPayment = () => {
    setCurrentView('shop');
    setIsPaymentModalOpen(true);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Handle URL-based navigation for payment returns
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment_status');
    
    if (paymentStatus === 'success') {
      setCurrentView('success');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (paymentStatus === 'cancel') {
      setCurrentView('cancel');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  if (currentView === 'success') {
    return <PaymentSuccess onBackToShop={handleBackToShop} />;
  }

  if (currentView === 'cancel') {
    return (
      <PaymentCancel 
        onBackToCart={() => {
          setCurrentView('shop');
          setIsCartOpen(true);
        }}
        onRetryPayment={handleRetryPayment}
      />
    );
  }
  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <Hero />
      
      <Gallery
        artworks={artworks}
        onArtworkClick={handleArtworkClick}
        onAddToCart={handleAddToCart}
      />

      <About />

      <Contact />

      <Lightbox
        artwork={selectedArtwork}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        total={cartTotal}
        cartItems={cartItems}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Canvas Dreams. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;