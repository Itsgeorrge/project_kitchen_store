
'use client';
import React from 'react';
import { useCart } from './Cart';

const CartIcon = () => {
  const { cart, showCart, setShowCart, clearCart } = useCart();

  return (
    <div className="relative">
      <button className="p-2 rounded" onClick={() => setShowCart(!showCart)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13c-1.11 0-1.99.9-1.99 2L5 17c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V9c0-1.1-.9-2-2-2h-3l-2-2z" />
        </svg>
        <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-1">{cart.length}</span>
      </button>
      {showCart && (
        <div className="absolute top-12 right-0 bg-white p-4 rounded shadow-md w-64">
          <h2 className="text-lg font-bold">Wishlist</h2>
          <ul>
  {cart.map((product, index) => (
    <li key={`${product.id}-${index}`} className="py-2">
      <span className="font-bold">{product.photo_name}</span>
      <span className="text-gray-600"> - MK{product.price_details}</span>
    </li>
  ))}
</ul>

          <div className="flex justify-between mt-4">
            <button className="bg-red-600 text-white py-2 px-4 rounded" onClick={clearCart}>
              Clear list
            </button>
            <button className="bg-green-600 text-white py-2 px-4 rounded">Inquire</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartIcon;
