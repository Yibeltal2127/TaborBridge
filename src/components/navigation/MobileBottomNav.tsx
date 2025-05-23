import React from 'react';
import { Home, Search, Grid, Package, User } from 'lucide-react';

const MobileBottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
      <div className="grid grid-cols-5">
        <a
          href="/"
          className="flex flex-col items-center justify-center py-2 text-gray-500 hover:text-blue-600"
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </a>
        
        <a
          href="/search"
          className="flex flex-col items-center justify-center py-2 text-gray-500 hover:text-blue-600"
        >
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">Search</span>
        </a>
        
        <a
          href="/categories"
          className="flex flex-col items-center justify-center py-2 text-gray-500 hover:text-blue-600"
        >
          <Grid className="h-6 w-6" />
          <span className="text-xs mt-1">Categories</span>
        </a>
        
        <a
          href="/orders"
          className="flex flex-col items-center justify-center py-2 text-gray-500 hover:text-blue-600"
        >
          <Package className="h-6 w-6" />
          <span className="text-xs mt-1">Orders</span>
        </a>
        
        <a
          href="/account"
          className="flex flex-col items-center justify-center py-2 text-gray-500 hover:text-blue-600"
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Account</span>
        </a>
      </div>
    </nav>
  );
};

export default MobileBottomNav;