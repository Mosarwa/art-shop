import React from 'react';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

interface PaymentCancelProps {
  onBackToCart: () => void;
  onRetryPayment: () => void;
}

export default function PaymentCancel({ onBackToCart, onRetryPayment }: PaymentCancelProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Cancel Icon */}
          <div className="bg-red-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <XCircle className="h-12 w-12 text-red-600" />
          </div>

          {/* Title and Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Cancelled</h1>
          <p className="text-gray-600 mb-8">
            Your payment was cancelled. Don't worry, no charges were made to your account.
          </p>

          {/* Actions */}
          <div className="space-y-4">
            <button
              onClick={onRetryPayment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full font-semibold transition-all flex items-center justify-center space-x-2 transform hover:scale-105"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Try Payment Again</span>
            </button>

            <button
              onClick={onBackToCart}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-full font-semibold transition-all flex items-center justify-center space-x-2 transform hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Cart</span>
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help? Contact us at{' '}
              <a href="mailto:hello@canvasdreams.com" className="text-blue-600 hover:text-blue-700">
                hello@canvasdreams.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}