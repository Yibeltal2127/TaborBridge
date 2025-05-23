import React from 'react';
import { Package, Truck, CheckCircle, MessageCircle, MapPin, Phone } from 'lucide-react';
import Button from '../ui/Button';

interface OrderTrackingProps {
  order: {
    id: string;
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
    material: {
      name: string;
      image: string;
      quantity: number;
      unit: string;
    };
    seller: {
      name: string;
      phone: string;
    };
    delivery: {
      method: string;
      address: string;
      tracking?: {
        status: string;
        location: string;
        eta: string;
        agent?: {
          name: string;
          phone: string;
        };
      };
    };
    timeline: {
      status: string;
      date: string;
      description: string;
    }[];
  };
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ order }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-6 w-6 text-gray-400" />;
      case 'confirmed':
        return <CheckCircle className="h-6 w-6 text-blue-500" />;
      case 'processing':
        return <Package className="h-6 w-6 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-6 w-6 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      default:
        return <Circle className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Order #{order.id}
          </h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Button size="sm">
              View Invoice
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Order Status:</span>
          <span className={`
            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
              order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
              order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'}
          `}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 p-6">
        {/* Order timeline */}
        <div className="col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Order Timeline
          </h2>

          <div className="relative">
            {order.timeline.map((event, index) => (
              <div key={index} className="flex items-start mb-8">
                <div className="flex-shrink-0 w-8">
                  {getStatusIcon(event.status)}
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-medium text-gray-900">
                    {event.status}
                  </div>
                  <div className="text-sm text-gray-500">
                    {event.date}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    {event.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order details sidebar */}
        <div className="col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Order Details
            </h2>

            <div className="space-y-4">
              {/* Material info */}
              <div className="flex items-start">
                <img
                  src={order.material.image}
                  alt={order.material.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="ml-3">
                  <div className="font-medium text-gray-900">
                    {order.material.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.material.quantity} {order.material.unit}
                  </div>
                </div>
              </div>

              {/* Seller info */}
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">
                  Seller
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {order.seller.name}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                </div>
              </div>

              {/* Delivery info */}
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">
                  Delivery Details
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex items-start mb-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                    <span className="ml-2">{order.delivery.address}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Method: {order.delivery.method}
                  </div>
                </div>
              </div>

              {/* Delivery tracking */}
              {order.delivery.tracking && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    Delivery Tracking
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status</span>
                      <span className="font-medium text-gray-900">
                        {order.delivery.tracking.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Current Location</span>
                      <span className="font-medium text-gray-900">
                        {order.delivery.tracking.location}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">ETA</span>
                      <span className="font-medium text-gray-900">
                        {order.delivery.tracking.eta}
                      </span>
                    </div>
                  </div>

                  {order.delivery.tracking.agent && (
                    <div className="mt-4">
                      <div className="text-sm font-medium text-gray-900 mb-2">
                        Delivery Agent
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {order.delivery.tracking.agent.name}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;