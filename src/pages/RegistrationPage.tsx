import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import RegistrationForm from '../components/auth/RegistrationForm';
import { UserRole } from '../types';

const RegistrationPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!selectedRole ? (
            <div className="max-w-2xl mx-auto text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Join TaborBridge</h1>
              <p className="text-gray-600 mb-8">
                Choose your account type to get started with TaborBridge's construction materials marketplace.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className="bg-white rounded-lg p-8 border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all shadow-sm hover:shadow-md"
                  onClick={() => setSelectedRole(UserRole.BUYER)}
                >
                  <div className="h-16 w-16 mx-auto bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0C4DA2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Register as a Buyer</h2>
                  <p className="text-gray-600 text-sm">
                    Find and purchase construction materials, track deliveries, and manage your projects.
                  </p>
                  <ul className="mt-4 text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Access real-time material prices
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Schedule deliveries to your site
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Connect with verified suppliers
                    </li>
                  </ul>
                </div>
                
                <div 
                  className="bg-white rounded-lg p-8 border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all shadow-sm hover:shadow-md"
                  onClick={() => setSelectedRole(UserRole.SELLER)}
                >
                  <div className="h-16 w-16 mx-auto bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0C4DA2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Register as a Seller</h2>
                  <p className="text-gray-600 text-sm">
                    List your construction materials, manage inventory, and connect with buyers.
                  </p>
                  <ul className="mt-4 text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      List your materials and manage inventory
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Receive orders and manage fulfillment
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Expand your customer base across Ethiopia
                    </li>
                  </ul>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-8">
                Already have an account? <a href="/login" className="text-[#0C4DA2] font-medium">Sign in</a>
              </p>
            </div>
          ) : (
            <div>
              <button 
                onClick={() => setSelectedRole(null)}
                className="flex items-center text-[#0C4DA2] font-medium mb-6 hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to account selection
              </button>
              
              <RegistrationForm role={selectedRole} />
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RegistrationPage;