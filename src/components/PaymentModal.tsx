import React, { useState } from 'react';
import { X, CreditCard, User, Mail } from 'lucide-react';
import { payFastService } from '../services/payfast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  cartItems: Array<{
    id: number;
    title: string;
    price: number;
    quantity: number;
  }>;
  onPaymentSuccess: () => void;
}

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  total, 
  cartItems, 
  onPaymentSuccess 
}: PaymentModalProps) {
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Generate unique order ID
      const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Create item description
      const itemNames = cartItems.map(item => `${item.title} (x${item.quantity})`).join(', ');
      const itemDescription = `Canvas Art Purchase: ${itemNames}`;

      // Create payment data
      const paymentData = payFastService.createPaymentData({
        orderId,
        amount: total,
        customerName: customerData.name,
        customerEmail: customerData.email,
        itemName: 'Canvas Art Collection',
        itemDescription,
      });

      // Store order data in localStorage for success page
      localStorage.setItem('pendingOrder', JSON.stringify({
        orderId,
        items: cartItems,
        total,
        customer: customerData,
        timestamp: new Date().toISOString(),
      }));

      // Redirect to PayFast
      payFastService.redirectToPayment(paymentData);
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('There was an error processing your payment. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-all"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Secure Payment</h2>
            <p className="text-gray-600">Complete your purchase with PayFast</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-900">Total Amount:</span>
              <span className="text-2xl font-bold text-green-600">R{total.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} • Secure payment via PayFast
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                required
                value={customerData.name}
                onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                required
                value={customerData.email}
                onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={customerData.phone}
                onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-800">
                <strong>Secure Payment:</strong> You'll be redirected to PayFast's secure payment page to complete your transaction safely.
              </p>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 px-6 rounded-full font-semibold transition-all flex items-center justify-center space-x-3 transform hover:scale-105 disabled:transform-none"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  <span>Pay R{total.toLocaleString()} with PayFast</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Powered by PayFast • Secure SSL encryption • South African payment gateway
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}