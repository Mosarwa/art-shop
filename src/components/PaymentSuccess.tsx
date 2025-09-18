import React, { useEffect, useState } from 'react';
import { CheckCircle, Download, ArrowLeft } from 'lucide-react';

interface OrderData {
  orderId: string;
  items: Array<{
    id: number;
    title: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  timestamp: string;
}

interface PaymentSuccessProps {
  onBackToShop: () => void;
}

export default function PaymentSuccess({ onBackToShop }: PaymentSuccessProps) {
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    // Retrieve order data from localStorage
    const storedOrder = localStorage.getItem('pendingOrder');
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder));
      // Clear the stored order
      localStorage.removeItem('pendingOrder');
    }
  }, []);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Success Header */}
          <div className="bg-green-50 p-8 text-center">
            <div className="bg-green-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">Thank you for your purchase. Your order has been confirmed.</p>
          </div>

          {/* Order Details */}
          <div className="p-8">
            <div className="border-b pb-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Order ID</p>
                  <p className="font-semibold">{orderData.orderId}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date</p>
                  <p className="font-semibold">
                    {new Date(orderData.timestamp).toLocaleDateString('en-ZA')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Customer</p>
                  <p className="font-semibold">{orderData.customer.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-semibold">{orderData.customer.email}</p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Items Purchased</h3>
              <div className="space-y-3">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">R{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Paid:</span>
                <span className="text-2xl font-bold text-green-600">R{orderData.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• You'll receive an email confirmation shortly</li>
                <li>• Your artwork will be carefully packaged and shipped within 2-3 business days</li>
                <li>• Free shipping is included with your purchase</li>
                <li>• You'll receive tracking information once your order ships</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBackToShop}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full font-semibold transition-all flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Continue Shopping</span>
              </button>
              
              <button
                onClick={() => window.print()}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-full font-semibold transition-all flex items-center justify-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}