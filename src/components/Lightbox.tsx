import React from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { Artwork } from './Gallery';

interface LightboxProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (artwork: Artwork) => void;
}

export default function Lightbox({ artwork, isOpen, onClose, onAddToCart }: LightboxProps) {
  if (!isOpen || !artwork) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-all transform hover:scale-110"
        >
          <X className="h-6 w-6 text-gray-700" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-96 md:h-full object-cover"
            />
          </div>

          <div className="p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{artwork.title}</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">{artwork.description}</p>
              <div className="space-y-2 mb-6">
                <p className="text-gray-700">
                  <span className="font-semibold">Dimensions:</span> {artwork.dimensions}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Medium:</span> Oil on Canvas
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Style:</span> Contemporary
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold text-amber-600">R{artwork.price.toLocaleString()}</span>
                <span className="text-sm text-gray-500">Free shipping included</span>
              </div>
              
              <button
                onClick={() => {
                  onAddToCart(artwork);
                  onClose();
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-full font-semibold transition-all flex items-center justify-center space-x-3 transform hover:scale-105"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart - R{artwork.price.toLocaleString()}</span>
              </button>
            </div>
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