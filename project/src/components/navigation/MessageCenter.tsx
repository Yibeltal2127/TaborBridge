import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const MessageCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount] = useState(2);

  return (
    <div className="relative">
      <button
        className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium flex items-center justify-center transform -translate-y-1/2 translate-x-1/2">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">Messages</h3>
            <div className="mt-4 space-y-4">
              {/* Add message items here */}
              <p className="text-sm text-gray-500">No new messages</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageCenter;