import React from 'react';
import { ChevronRight, Paperclip as PaperBag, CreditCard, Truck, Users, BarChart3, Shield, Database, Gauge } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
  // Background image URL (Placeholder for Ethiopian construction scene)
  const heroBgImage = "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  
  return (
    <div>
      <div 
        className="relative min-h-screen bg-cover bg-center flex flex-col"
        style={{ backgroundImage: `url(${heroBgImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        <Navbar />
        
        {/* Hero content */}
        <div className="flex-1 flex items-center relative z-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl">
              Ethiopia's Premier Construction Materials Marketplace
            </h1>
            <p className="text-xl text-white opacity-90 mb-8 max-w-2xl">
              Connect with trusted suppliers, get real-time pricing, and streamline your construction project with TaborBridge.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <a href="/register">
                <Button size="lg">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-gray-900">
                  How It Works
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Value proposition section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose TaborBridge?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 text-center transition-all duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                <PaperBag className="h-8 w-8 text-[#0C4DA2]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Quality Materials</h3>
              <p className="text-gray-600">
                Access a wide range of verified construction materials from trusted suppliers all across Ethiopia.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 text-center transition-all duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                <CreditCard className="h-8 w-8 text-[#0C4DA2]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Transactions</h3>
              <p className="text-gray-600">
                Enjoy safe payment options and transparent pricing with our secure transaction system.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 text-center transition-all duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                <Truck className="h-8 w-8 text-[#0C4DA2]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reliable Delivery</h3>
              <p className="text-gray-600">
                Schedule deliveries to your construction site with real-time tracking and reliable service.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* How it works section */}
      <div id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            How TaborBridge Works
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Our simple process connects buyers with suppliers for a seamless construction materials procurement experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 rounded-full bg-[#0C4DA2] text-white w-8 h-8 flex items-center justify-center font-bold md:hidden">
                1
              </div>
              <div className="bg-white rounded-lg p-8 text-center h-full shadow-sm">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                  <Users className="h-8 w-8 text-[#0C4DA2]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Create an Account</h3>
                <p className="text-gray-600">
                  Sign up as a buyer or seller and complete your profile verification to access the marketplace.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 left-full -translate-y-1/2 -translate-x-1/2 w-12 h-2 bg-gray-300">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0C4DA2]"></div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 rounded-full bg-[#0C4DA2] text-white w-8 h-8 flex items-center justify-center font-bold md:hidden">
                2
              </div>
              <div className="bg-white rounded-lg p-8 text-center h-full shadow-sm">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                  <BarChart3 className="h-8 w-8 text-[#0C4DA2]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Browse & Compare</h3>
                <p className="text-gray-600">
                  Search for materials, compare prices, check availability, and select the best options for your project.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 left-full -translate-y-1/2 -translate-x-1/2 w-12 h-2 bg-gray-300">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0C4DA2]"></div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 rounded-full bg-[#0C4DA2] text-white w-8 h-8 flex items-center justify-center font-bold md:hidden">
                3
              </div>
              <div className="bg-white rounded-lg p-8 text-center h-full shadow-sm">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                  <Truck className="h-8 w-8 text-[#0C4DA2]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Order & Deliver</h3>
                <p className="text-gray-600">
                  Place your order, make secure payments, and schedule delivery to your construction site.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a href="/register">
              <Button>
                Join TaborBridge Today
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Features to Power Your Construction Project
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 text-center transition-all duration-300 hover:shadow-md rounded-lg">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                <Database className="h-6 w-6 text-[#0C4DA2]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time Inventory</h3>
              <p className="text-gray-600 text-sm">
                Up-to-date material availability
              </p>
            </div>
            
            <div className="p-6 text-center transition-all duration-300 hover:shadow-md rounded-lg">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                <Gauge className="h-6 w-6 text-[#0C4DA2]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Price Alerts</h3>
              <p className="text-gray-600 text-sm">
                Get notified of price changes
              </p>
            </div>
            
            <div className="p-6 text-center transition-all duration-300 hover:shadow-md rounded-lg">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                <Shield className="h-6 w-6 text-[#0C4DA2]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Suppliers</h3>
              <p className="text-gray-600 text-sm">
                Quality assurance guaranteed
              </p>
            </div>
            
            <div className="p-6 text-center transition-all duration-300 hover:shadow-md rounded-lg">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                <Truck className="h-6 w-6 text-[#0C4DA2]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Delivery Tracking</h3>
              <p className="text-gray-600 text-sm">
                Monitor your deliveries in real-time
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Users Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Abebe Bekele</h4>
                  <p className="text-gray-600 text-sm">Residential Contractor, Addis Ababa</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "TaborBridge has transformed how I source materials for my projects. The price transparency and delivery scheduling have saved me both time and money."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Sara Haile</h4>
                  <p className="text-gray-600 text-sm">Building Materials Supplier, Bahir Dar</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As a supplier, TaborBridge has helped me reach new customers across Ethiopia. The verification process ensures that all transactions are secure and reliable."
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="py-16 bg-[#0C4DA2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Streamline Your Construction Material Sourcing?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of construction professionals and suppliers on Ethiopia's premier materials marketplace.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <a href="/register">
              <Button variant="secondary" size="lg">
                Sign Up Now
              </Button>
            </a>
            <a href="/login">
              <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-[#0C4DA2]">
                Log In
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Mobile app section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Take TaborBridge with You
              </h2>
              <p className="text-gray-600 mb-6">
                Download our mobile app to manage your construction materials on the go. Get instant price updates, track deliveries, and connect with suppliers from anywhere.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="block">
                  <img src="https://via.placeholder.com/140x40" alt="Google Play" />
                </a>
                <a href="#" className="block">
                  <img src="https://via.placeholder.com/140x40" alt="App Store" />
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gray-200 rounded-lg w-full h-96 flex items-center justify-center">
                <span className="text-gray-500">Mobile App Screenshot</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Updated with TaborBridge
            </h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for the latest construction material trends, price updates, and industry insights.
            </p>
            <form className="flex flex-col sm:flex-row sm:space-x-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 flex-grow mb-3 sm:mb-0"
              />
              <Button type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LandingPage;