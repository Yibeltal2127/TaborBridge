import React, { useState } from 'react';
import { Search } from 'lucide-react';

const UniversalSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="search"
          placeholder="Search materials, orders, suppliers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {searchTerm && (
        <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg">
          <div className="py-1">
            {/* Add search results here */}
            <div className="px-4 py-2 text-sm text-gray-500">
              No results found
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversalSearch;