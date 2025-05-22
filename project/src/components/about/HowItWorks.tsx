import React from 'react';
import { ShoppingBag, Truck, CreditCard, CheckCircle, Building, Package, Users } from 'lucide-react';
import Button from '../ui/Button';

const HowItWorks: React.FC = () => {
  const buyerSteps = [
    {
      icon: <ShoppingBag className="h-8 w-8 text-blue-500" />,
      title: 'Browse & Compare',
      description: 'Search through our extensive catalog of construction materials and compare prices, specifications, and seller ratings.',
    },
    {
      icon: <CreditCard className="h-8 w-8 text-blue-500" />,
      title: 'Place Order',
      description: 'Select your materials, choose delivery options, and make secure payments through our escrow system.',
    },
    {
      icon: <Truck className="h-8 w-8 text-blue-500" />,
      title: 'Track Delivery',
      description: 'Monitor your delivery in real-time and receive updates until your materials arrive safely.',
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-blue-500" />,
      title: 'Confirm & Review',
      description: 'Inspect your materials, confirm receipt, and share your experience with the TaborBridge community.',
    },
  ];

  const sellerSteps = [
    {
      icon: <Building className="h-8 w-8 text-blue-500" />,
      title: 'Register Business',
      description: 'Complete our verification process to establish your trusted seller account.',
    },
    {
      icon: <Package className="h-8 w-8 text-blue-500" />,
      title: 'List Materials',
      description: 'Upload your inventory with detailed specifications and competitive pricing.',
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: 'Manage Orders',
      description: 'Receive orders, coordinate with buyers, and arrange deliveries through our platform.',
    },
    {
      icon: <CreditCard className="h-8 w-8 text-blue-500" />,
      title: 'Receive Payments',
      description: 'Get paid securely through our escrow system once deliveries are confirmed.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How TaborBridge Works
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          TaborBridge connects construction material buyers and sellers through a
          secure, efficient marketplace designed for Ethiopia's construction industry.
        </p>
      </div>

      {/* For Buyers */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">For Buyers</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find quality construction materials from verified suppliers with real-time
            pricing and reliable delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {buyerSteps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="absolute -top-4 left-6 bg-white p-2 rounded-lg border border-gray-200">
                {step.icon}
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button size="lg">
            Start Buying
          </Button>
        </div>
      </div>

      {/* For Sellers */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">For Sellers</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expand your business reach and manage sales efficiently through our
            digital marketplace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sellerSteps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="absolute -top-4 left-6 bg-white p-2 rounded-lg border border-gray-200">
                {step.icon}
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button size="lg">
            Start Selling
          </Button>
        </div>
      </div>

      {/* Trust & Safety */}
      <div className="mt-20 bg-gray-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Trust & Safety
          </h2>
          <p className="text-lg text-gray-600">
            Your security and satisfaction are our top priorities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900 ml-2">
                Verified Sellers
              </h3>
            </div>
            <p className="text-gray-600">
              All sellers undergo thorough verification to ensure quality and reliability.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Lock className="h-6 w-6 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900 ml-2">
                Secure Payments
              </h3>
            </div>
            <p className="text-gray-600">
              Your payments are protected through our secure escrow system.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Star className="h-6 w-6 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900 ml-2">
                Quality Assurance
              </h3>
            </div>
            <p className="text-gray-600">
              All materials are inspected and verified before delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;