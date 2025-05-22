import React from 'react';
import { Calendar, TrendingUp, Package, Clock, AlertCircle } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { format } from 'date-fns';

const BuyerDashboard: React.FC = () => {
  // Mock data
  const stats = [
    { label: 'Total Spent', value: 'ETB 125,000', trend: '+12.5%' },
    { label: 'Materials Purchased', value: '48', trend: '+8.3%' },
    { label: 'Avg. Processing Time', value: '2.3 days', trend: '-15.2%' },
    { label: 'Trust Score', value: '85%', trend: '+5.0%' },
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2024-03-10',
      material: 'Portland Cement',
      quantity: '50 bags',
      status: 'In Transit',
      supplier: 'Dangote Cement',
    },
    {
      id: 'ORD-002',
      date: '2024-03-09',
      material: 'Reinforcement Steel',
      quantity: '2.5 tons',
      status: 'Processing',
      supplier: 'East Steel Co.',
    },
  ];

  const priceAlerts = [
    {
      material: 'Portland Cement',
      oldPrice: 850,
      newPrice: 800,
      change: -5.9,
    },
    {
      material: 'Hollow Concrete Blocks',
      oldPrice: 45,
      newPrice: 48,
      change: 6.7,
    },
  ];

  return (
    <DashboardLayout>
      {/* Welcome section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {format(new Date(), "EEEE, MMMM do")}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your construction materials today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded text-sm ${
                  stat.trend.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {stat.trend}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h2>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <li key={order.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {order.material}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.quantity} • {order.supplier}
                        </p>
                        <p className="text-xs text-gray-400">
                          Order #{order.id} • {format(new Date(order.date), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <a
                href="/dashboard/orders"
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View all orders
              </a>
            </div>
          </div>
        </div>

        {/* Price Alerts */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Price Alerts</h2>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {priceAlerts.map((alert) => (
                  <li key={alert.material} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {alert.material}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-500">
                            ETB {alert.oldPrice.toFixed(2)}
                          </span>
                          <span className="mx-2 text-gray-400">→</span>
                          <span className="text-sm font-medium text-gray-900">
                            ETB {alert.newPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          alert.change < 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {alert.change > 0 ? '+' : ''}{alert.change}%
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <a
                href="/dashboard/alerts"
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Manage price alerts
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BuyerDashboard;