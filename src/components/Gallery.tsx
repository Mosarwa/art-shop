import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export interface Artwork {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  dimensions: string;
}

interface GalleryProps {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
  onAddToCart: (artwork: Artwork) => void;
}

export default function Gallery({ artworks, onArtworkClick, onAddToCart }: GalleryProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(artworks.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentArtworks = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return artworks.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Collection</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover unique canvas paintings that bring emotion and beauty to any space
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all transform hover:scale-110 -ml-6"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all transform hover:scale-110 -mr-6"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Artwork Grid */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {artworks
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((artwork) => (
                        <div
                          key={artwork.id}
                          className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                        >
                          <div className="relative overflow-hidden">
                            <img
                              src={artwork.image}
                              alt={artwork.title}
                              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                              onClick={() => onArtworkClick(artwork)}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                          </div>
                          
                          <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{artwork.title}</h3>
                            <p className="text-gray-600 mb-2">{artwork.dimensions}</p>
                            <p className="text-2xl font-bold text-amber-600 mb-4">R{artwork.price.toLocaleString()}</p>
                            
                            <button
                              onClick={() => onAddToCart(artwork)}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full font-semibold transition-all flex items-center justify-center space-x-2 transform hover:scale-105"
                            >
                              <Plus className="h-5 w-5" />
                              <span>Add to Cart</span>
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}