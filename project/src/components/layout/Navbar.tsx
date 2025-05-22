import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };
  
  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-10 transition-all duration-300
        ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              {/* Placeholder for logo */}
              <div className="h-10 w-10 bg-[#0C4DA2] rounded-md flex items-center justify-center">
                <span className="text-white font-bold">TB</span>
              </div>
              <span className={`ml-2 font-bold text-xl ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                TaborBridge
              </span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a 
              href="#" 
              className={`text-sm font-medium ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}
            >
              About
            </a>
            <a 
              href="#" 
              className={`text-sm font-medium ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}
            >
              How It Works
            </a>
            <a 
              href="#" 
              className={`text-sm font-medium ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}
            >
              Pricing
            </a>
            <a 
              href="#" 
              className={`text-sm font-medium ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}
            >
              Contact
            </a>
            
            <div className="ml-4 flex items-center">
              <button 
                className={`flex items-center text-sm font-medium ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}
              >
                <Globe className="h-4 w-4 mr-1" />
                <span>EN</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            {isAuthenticated ? (
              <div className="relative ml-4">
                <button 
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {user?.firstName.charAt(0)}{user?.lastName.charAt(0)}
                    </span>
                  </div>
                  <ChevronDown className={`h-4 w-4 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
                </button>
                
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                    <a 
                      href="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </a>
                    <a 
                      href="/verification-status" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Verification Status
                    </a>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <a href="/login">
                  <Button variant="outline" size="sm">
                    Log in
                  </Button>
                </a>
                <a href="/register">
                  <Button size="sm">
                    Sign up
                  </Button>
                </a>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className={`p-1 rounded-md ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a 
              href="#" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              About
            </a>
            <a 
              href="#" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              How It Works
            </a>
            <a 
              href="#" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Pricing
            </a>
            <a 
              href="#" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Contact
            </a>
            
            <button 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700"
            >
              <Globe className="h-5 w-5 mr-2" />
              <span>English</span>
            </button>
          </div>
          
          {isAuthenticated ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {user?.firstName.charAt(0)}{user?.lastName.charAt(0)}
                  </span>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user?.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <a 
                  href="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </a>
                <a 
                  href="/verification-status" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Verification Status
                </a>
                <button 
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200 px-5 space-y-3">
              <a href="/login" className="block w-full">
                <Button variant="outline" fullWidth>
                  Log in
                </Button>
              </a>
              <a href="/register" className="block w-full">
                <Button fullWidth>
                  Sign up
                </Button>
              </a>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;