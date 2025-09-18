import React from 'react';
import { Palette, Award, Heart } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About the Artist</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Welcome to my creative world, where every brushstroke tells a story and every canvas 
              holds a piece of my soul. I've been passionate about painting for over two decades, 
              constantly exploring the boundaries between reality and imagination.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              My work focuses on capturing the ethereal beauty of landscapes, the raw emotion of 
              abstract compositions, and the timeless elegance of contemporary art. Each piece is 
              carefully crafted with premium materials to ensure lasting beauty in your space.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">20+ Years</h3>
                <p className="text-gray-600 text-sm">Professional Experience</p>
              </div>

              <div className="text-center">
                <div className="bg-amber-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">50+ Awards</h3>
                <p className="text-gray-600 text-sm">International Recognition</p>
              </div>

              <div className="text-center">
                <div className="bg-red-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">1000+</h3>
                <p className="text-gray-600 text-sm">Happy Collectors</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Artist at work"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
              <p className="text-sm text-gray-600 mb-1">Currently working on</p>
              <p className="font-semibold text-gray-900">"Ethereal Landscapes" Series</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}