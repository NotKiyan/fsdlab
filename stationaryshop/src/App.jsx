import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import eraserImage from './assets/eraser.png';
import geometryboxImage from './assets/geometrybox.png';
import penImage from './assets/pen.png';
import pencilsImage from './assets/pencil.png';
import rulerImage from './assets/ruler.png';
import scissorsImage from './assets/scissor.png';
import sharpenerImage from './assets/sharpener.png';

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <line x1="12" y1="5" x2="12" y2="19"></line>
  <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const PrinterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <polyline points="6 9 6 2 18 2 18 9"></polyline>
  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
  <rect x="6" y="14" width="12" height="8"></rect>
  </svg>
);




export default function App() {

  const [cart, setCart] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);


  const seasons = useMemo(() => [
    { name: 'Summer', discount: 0.15},
    { name: 'Autumn', discount: 0.10 },
    { name: 'Winter', discount: 0.10},
    { name: 'Spring', discount: 0.13},
  ], []);

  const getInitialSeasonIndex = () => {
    const month = new Date().getMonth(); // 0-11
    if (month >= 5 && month <= 7) return 0; // Summer
    if (month >= 8 && month <= 10) return 1; // Autumn
    if (month === 11 || month <= 1) return 2; // Winter
    return 3; // Spring
  };

  const [seasonIndex, setSeasonIndex] = useState(getInitialSeasonIndex);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeasonIndex(prevIndex => (prevIndex + 1) % seasons.length);
    }, 60000); // Change season every 1 minute

    return () => clearInterval(timer);
  }, [seasons.length]);

  const currentSeason = seasons[seasonIndex];
  const { discount } = currentSeason;

  // --- Product Data ---
  const products = [
    { id: 1, name: 'Eraser', price: 2.50, imageUrl: eraserImage },
    { id: 2, name: 'Geometry Box', price: 15.00, imageUrl: geometryboxImage },
    { id: 3, name: 'Pen', price: 5.00, imageUrl: penImage },
    { id: 4, name: 'Pencils', price: 3.75, imageUrl: pencilsImage },
    { id: 5, name: 'Ruler', price: 4.25, imageUrl: rulerImage },
    { id: 6, name: 'Scissors', price: 8.50, imageUrl: scissorsImage },
    { id: 7, name: 'Sharpener', price: 6.00, imageUrl: sharpenerImage },
  ];


  const handleQuantityChange = (product, amount) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + amount;
        if (newQuantity <= 0) {
          return currentCart.filter(item => item.id !== product.id);
        }
        return currentCart.map(item =>
        item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      } else if (amount > 0) {
        return [...currentCart, { ...product, quantity: 1 }];
      }
      return currentCart;
    });
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      setShowReceipt(true);
    }
  }

  const handleNewSale = () => {
    setCart([]);
    setShowReceipt(false);
  }

  // --- Memoized Calculations for Performance ---
  const { subtotal, totalItems } = useMemo(() => {
    let items = 0;
    const total = cart.reduce((acc, item) => {
      items += item.quantity;
      return acc + item.price * item.quantity;
    }, 0);
    return { subtotal: total, totalItems: items };
  }, [cart]);

  const discountAmount = subtotal * discount;
  const grandTotal = subtotal - discountAmount;

  const receiptDate = useMemo(() => new Date().toLocaleString(), [showReceipt]);


  // --- Render ---
  return (
    <div className="app-container" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')" }}>

    <div
    className="seasonal-banner"
    style={{ backgroundImage: `url('${currentSeason.image}')` }}
    >
    <div className="seasonal-banner-overlay"></div>
    <div className="seasonal-banner-text">
    <p>Special Offer</p>
    <h2 style={{ fontFamily: "'Caveat', cursive" }}>
    {currentSeason.name} Sale: {(discount * 100)}% OFF!
    </h2>
    </div>
    </div>

    <div className="container">
    <header className="app-header">
    <h1 className="app-title" style={{ fontFamily: "'Caveat', cursive" }}>
    Staples & Stories
    </h1>
    <p className="app-subtitle">Your cozy corner for creative supplies</p>
    </header>

    <main className="main-content">
    <section className="products-section">
    <h2 className="section-title">Our Collection</h2>
    <div className="product-grid">
    {products.map(product => {
      const cartItem = cart.find(item => item.id === product.id);
      const quantityInCart = cartItem ? cartItem.quantity : 0;

      return (
        <div key={product.id} className="product-card">
        <div className="product-image-container">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        </div>
        <div className="product-card-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <div className="quantity-controls-container">
        {quantityInCart === 0 ? (
          <button
          onClick={() => handleQuantityChange(product, 1)}
          className="add-to-cart-btn"
          >
          Add to Cart
          </button>
        ) : (
          <div className="quantity-changer">
          <button
          onClick={() => handleQuantityChange(product, -1)}
          className="quantity-btn"
          aria-label="Decrease quantity"
          >
          <MinusIcon />
          </button>
          <span className="quantity-display">{quantityInCart}</span>
          <button
          onClick={() => handleQuantityChange(product, 1)}
          className="quantity-btn"
          aria-label="Increase quantity"
          >
          <PlusIcon />
          </button>
          </div>
        )}
        </div>
        </div>
        </div>
      );
    })}
    </div>
    </section>

    <aside className="pos-section">
    <div className="pos-terminal">
    <div className="pos-screen">
    <div className="pos-screen-header">
    <h2>Current Sale</h2>
    <ShoppingCartIcon />
    </div>
    <div className="pos-item-list">
    {cart.length === 0 ? (
      <p className="empty-cart-message">Add items to sale...</p>
    ) : (
      cart.map(item => (
        <div key={item.id} className="pos-cart-item">
        <span>{item.quantity}x</span>
        <span className="pos-cart-item-name">{item.name}</span>
        <span>${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))
    )}
    </div>
    </div>

    <div className="pos-totals">
    <div className="total-row">
    <span>Subtotal</span>
    <span>${subtotal.toFixed(2)}</span>
    </div>
    <div className="total-row discount">
    <span>Discount</span>
    <span>-${discountAmount.toFixed(2)}</span>
    </div>
    <div className="total-row grand-total">
    <span>TOTAL</span>
    <span>${grandTotal.toFixed(2)}</span>
    </div>
    <button
    onClick={handleCheckout}
    disabled={cart.length === 0}
    className="checkout-btn"
    >
    <PrinterIcon />
    CHECKOUT
    </button>
    </div>
    </div>

    {showReceipt && (
      <div className="receipt-modal-overlay">
      <div className="receipt animate-fade-in-up">
      <div className="receipt-header">
      <h2 className="receipt-title">Staples & Stories</h2>
      <p>Your Cozy Corner</p>
      <p className="receipt-date">{receiptDate}</p>
      </div>
      <div className="receipt-items">
      {cart.map(item => (
        <div key={item.id} className="receipt-item">
        <span>{item.quantity}x</span>
        <span className="receipt-item-name">{item.name}</span>
        <span className="receipt-item-price">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      </div>
      <div className="receipt-totals">
      <div className="receipt-total-row">
      <span>Subtotal:</span>
      <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="receipt-total-row">
      <span>{currentSeason.name} Discount ({(discount * 100).toFixed(0)}%):</span>
      <span>-${discountAmount.toFixed(2)}</span>
      </div>
      <div className="receipt-total-row grand-total">
      <span>TOTAL:</span>
      <span>${grandTotal.toFixed(2)}</span>
      </div>
      </div>
      <div className="receipt-footer">
      <p>Thank you for your purchase!</p>
      </div>
      <div className="new-sale-container">
      <button
      onClick={handleNewSale}
      className="new-sale-btn"
      >
      New Sale
      </button>
      </div>
      </div>
      </div>
    )}
    </aside>
    </main>
    </div>
    </div>
  );
}

