import React, { useState } from 'react';
import { Search, Bell, MessageCircle, Globe, ShoppingCart, Menu, X } from 'lucide-react';
import CategoryMegaMenu from './CategoryMegaMenu';
import NotificationCenter from './NotificationCenter';
import MessageCenter from './MessageCenter';
import UserAccountMenu from './UserAccountMenu';
import UniversalSearch from './UniversalSearch';
import AdminQuickTools from './AdminQuickTools';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const isAdmin = user?.role === 'admin';
  const isBuyer = user?.role === 'buyer';

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-[#0C4DA2] rounded-md flex items-center justify-center">
                <span className="text-white font-bold">TB</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 hidden md:block">
                TaborBridge
              </span>
            </div>

            <div className="hidden lg:ml-6 lg:flex lg:items-center">
              <CategoryMegaMenu />
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <UniversalSearch />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-6 w-6" />
            </button>

            {/* Notifications */}
            <NotificationCenter />

            {/* Messages */}
            <MessageCenter />

            {/* Language Selector */}
            <div className="hidden md:flex items-center">
              <button className="flex items-center text-gray-500 hover:text-gray-700">
                <Globe className="h-5 w-5" />
                <span className="ml-1 text-sm">EN</span>
              </button>
            </div>

            {/* Cart (if buyer) */}
            {isBuyer && (
              <button className="relative p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium flex items-center justify-center transform -translate-y-1/2 translate-x-1/2">
                  3
                </span>
              </button>
            )}

            {/* Admin Quick Tools */}
            {isAdmin && <AdminQuickTools />}

            {/* User Account Menu */}
            <UserAccountMenu />
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="p-4 md:hidden border-t border-gray-200">
            <UniversalSearch />
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {/* Mobile Category Menu */}
            <div className="px-4">
              <CategoryMegaMenu mobile />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;