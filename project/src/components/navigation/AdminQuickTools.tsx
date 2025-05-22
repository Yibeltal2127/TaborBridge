import React, { useState } from 'react';
import { Settings } from 'lucide-react';

const AdminQuickTools: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <a
              href="/admin/verification"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Verification Queue
            </a>
            <a
              href="/admin/disputes"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Dispute Resolution
            </a>
            <a
              href="/admin/analytics"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Analytics Dashboard
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuickTools;