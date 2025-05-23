import React from 'react';
import { Star, Clock, MapPin, Package } from 'lucide-react';
import Button from '../ui/Button';

interface MaterialCardProps {
  material: {
    id: string;
    name: string;
    image: string;
    price: number;
    unit: string;
    location: string;
    rating: number;
    reviewCount: number;
    seller: {
      name: string;
      verified: boolean;
      rating: number;
    };
    stock: number;
    deliveryTime: string;
  };
  view?: 'grid' | 'list';
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material, view = 'grid' }) => {
  const isGrid = view === 'grid';

  if (isGrid) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="relative">
          <img
            src={material.image}
            alt={material.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {material.seller.verified && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              Verified Seller
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
            {material.name}
          </h3>

          <div className="flex items-center mb-2">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm text-gray-600">{material.rating}</span>
            <span className="text-sm text-gray-400 ml-1">
              ({material.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            {material.location}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xl font-bold text-gray-900">
                ETB {material.price.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">per {material.unit}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {material.stock} available
              </div>
              <div className="text-xs text-gray-500">
                Min. order: 10 {material.unit}
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" fullWidth>
              Details
            </Button>
            <Button fullWidth>
              Order Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-4">
      <div className="flex">
        <img
          src={material.image}
          alt={material.name}
          className="w-48 h-48 object-cover rounded-lg"
        />

        <div className="flex-1 ml-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900">
              {material.name}
            </h3>
            {material.seller.verified && (
              <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                Verified Seller
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>{material.rating}</span>
                <span className="ml-1">({material.reviewCount} reviews)</span>
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {material.location}
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {material.deliveryTime} delivery
              </div>
            </div>

            <div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Package className="h-4 w-4 mr-1" />
                {material.stock} {material.unit} available
              </div>

              <div className="text-2xl font-bold text-gray-900">
                ETB {material.price.toLocaleString()}
                <span className="text-sm text-gray-500 font-normal ml-1">
                  per {material.unit}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline">
              Add to Comparison
            </Button>
            <Button variant="outline">
              View Details
            </Button>
            <Button>
              Order Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;