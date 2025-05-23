import React from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  History,
  Bookmark,
  Search,
  Users,
  Settings,
  HelpCircle,
  Package,
  BarChart3,
  UserCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const isSeller = user?.role === UserRole.SELLER;

  const buyerNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: ShoppingCart, label: 'Active Orders', href: '/dashboard/orders' },
    { icon: History, label: 'Purchase History', href: '/dashboard/history' },
    { icon: Bookmark, label: 'Saved Materials', href: '/dashboard/saved' },
    { icon: Search, label: 'Material Search', href: '/dashboard/search' },
    { icon: Users, label: 'Expert Connect', href: '/dashboard/experts', disabled: true },
  ];

  const sellerNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Package, label: 'Inventory', href: '/dashboard/inventory' },
    { icon: ShoppingCart, label: 'Orders', href: '/dashboard/orders' },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: UserCircle, label: 'Customers', href: '/dashboard/customers' },
  ];

  const commonNavItems = [
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
    { icon: HelpCircle, label: 'Help & Support', href: '/dashboard/support' },
  ];

  const navItems = [...(isSeller ? sellerNavItems : buyerNavItems), ...commonNavItems];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar content */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md
                  ${item.disabled
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon className={`
                  mr-3 h-5 w-5
                  ${item.disabled ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-500'}
                `} />
                {item.label}
              </a>
            ))}
          </nav>

          {/* Trust score */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Trust Score</span>
              <span className="text-sm font-semibold text-blue-600">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: '85%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;