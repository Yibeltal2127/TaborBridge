import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Star, Share2, Heart, ShoppingCart, Truck, Shield, MapPin, ExternalLink, MessageCircle } from 'lucide-react';
import Button from '../ui/Button';

interface MaterialDetailProps {
  material: {
    id: string;
    name: string;
    category: string;
    images: { original: string; thumbnail: string }[];
    price: number;
    unit: string;
    stock: number;
    minOrder: number;
    specifications: Record<string, string>;
    description: string;
    seller: {
      id: string;
      name: string;
      verified: boolean;
      rating: number;
      totalOrders: number;
      responseRate: number;
      joinedDate: string;
    };
    delivery: {
      methods: string[];
      estimatedTime: string;
      cost: number;
      location: string;
    };
  };
}

const MaterialDetail: React.FC<MaterialDetailProps> = ({ material }) => {
  const [selectedTab, setSelectedTab] = useState('specifications');
  const [quantity, setQuantity] = useState(material.minOrder);

  const tabs = [
    { id: 'specifications', label: 'Specifications' },
    { id: 'description', label: 'Description' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'questions', label: 'Questions' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column - Gallery and main info */}
        <div className="lg:w-2/3">
          <nav className="flex items-center space-x-1 text-sm text-gray-500 mb-4">
            <a href="#" className="hover:text-gray-900">Materials</a>
            <span>/</span>
            <a href="#" className="hover:text-gray-900">{material.category}</a>
            <span>/</span>
            <span className="text-gray-900">{material.name}</span>
          </nav>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="mb-6">
              <TransformWrapper>
                <TransformComponent>
                  <ImageGallery
                    items={material.images}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    useBrowserFullscreen={false}
                  />
                </TransformComponent>
              </TransformWrapper>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{material.name}</h1>
              <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-gray-600">
                  <Heart className="h-6 w-6" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="ml-1 text-sm font-medium text-gray-900">4.8</span>
              </div>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-gray-500">150 Reviews</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-gray-500">500+ Sold</span>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-gray-900">
                    ETB {material.price.toLocaleString()}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    per {material.unit}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Min. Order: {material.minOrder} {material.unit}
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min={material.minOrder}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Price
                  </label>
                  <div className="text-lg font-semibold text-gray-900">
                    ETB {(material.price * quantity).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button className="flex-1">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`
                      py-4 px-6 text-sm font-medium border-b-2 
                      ${selectedTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {selectedTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(material.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">{key}</span>
                      <span className="text-sm font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'description' && (
                <div className="prose max-w-none">
                  <p>{material.description}</p>
                </div>
              )}

              {selectedTab === 'reviews' && (
                <div>Reviews content</div>
              )}

              {selectedTab === 'questions' && (
                <div>Questions content</div>
              )}
            </div>
          </div>
        </div>

        {/* Right column - Seller info and delivery */}
        <div className="lg:w-1/3 space-y-6">
          {/* Seller Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {material.seller.name}
                </h2>
                {material.seller.verified && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified Seller
                  </span>
                )}
              </div>
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm text-gray-500">Rating</div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="ml-1 font-medium">{material.seller.rating}</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Orders</div>
                <div className="font-medium">{material.seller.totalOrders}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Response Rate</div>
                <div className="font-medium">{material.seller.responseRate}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Joined</div>
                <div className="font-medium">{material.seller.joinedDate}</div>
              </div>
            </div>

            <Button variant="outline" fullWidth>
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact Seller
            </Button>
          </div>

          {/* Delivery Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Delivery Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Location</div>
                  <div className="text-sm text-gray-500">{material.delivery.location}</div>
                </div>
              </div>

              <div className="flex items-start">
                <Truck className="h-5 w-5 text-gray-400 mt-1" />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Delivery Options</div>
                  <ul className="text-sm text-gray-500">
                    {material.delivery.methods.map((method) => (
                      <li key={method}>{method}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-400 mt-1" />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Estimated Time</div>
                  <div className="text-sm text-gray-500">{material.delivery.estimatedTime}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust & Safety */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Trust & Safety
            </h2>

            <div className="space-y-4">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="ml-2 text-sm text-gray-600">
                  Verified Quality Certification
                </span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="ml-2 text-sm text-gray-600">
                  Secure Payment Protection
                </span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="ml-2 text-sm text-gray-600">
                  Money-back Guarantee
                </span>
              </div>
            </div>

            <a
              href="#"
              className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
            >
              Learn more about buyer protection
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetail;