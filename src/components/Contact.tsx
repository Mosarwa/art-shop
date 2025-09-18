import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions about a piece or interested in commissioning custom artwork? 
            I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="bg-blue-600 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Mail className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-300">info@canvasdreams.co.za</p>
          </div>

          <div className="text-center">
            <div className="bg-amber-600 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Phone className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-300">+27 11 123 4567</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-600 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Studio</h3>
            <p className="text-gray-300">123 Art Quarter<br />Johannesburg, GP 2000</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8">Follow My Journey</h3>
          <div className="flex justify-center space-x-6">
            <a href="#" className="bg-gray-800 hover:bg-gray-700 p-4 rounded-full transition-colors transform hover:scale-110">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="bg-gray-800 hover:bg-gray-700 p-4 rounded-full transition-colors transform hover:scale-110">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="bg-gray-800 hover:bg-gray-700 p-4 rounded-full transition-colors transform hover:scale-110">
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}