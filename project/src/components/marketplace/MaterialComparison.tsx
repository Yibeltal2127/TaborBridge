import React from 'react';
import { X, Plus, ChevronDown, Star } from 'lucide-react';
import Button from '../ui/Button';

interface Material {
  id: string;
  name: string;
  image: string;
  price: number;
  unit: string;
  rating: number;
  reviewCount: number;
  stock: number;
  specifications: Record<string, string>;
  seller: {
    name: string;
    verified: boolean;
    rating: number;
  };
  delivery: {
    time: string;
    cost: number;
  };
}

interface MaterialComparisonProps {
  materials: Material[];
  onRemove: (id: string) => void;
  onAdd: () => void;
}

const MaterialComparison: React.FC<MaterialComparisonProps> = ({
  materials,
  onRemove,
  onAdd,
}) => {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Compare Materials
          </h2>
          <div className="flex items-center space-x-4">
            <button className="text-sm text-blue-600 hover:text-blue-500">
              Share Comparison
            </button>
            <button className="text-sm text-blue-600 hover:text-blue-500">
              Print
            </button>
          </div>
        </div>

        {/* Material headers */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {materials.map((material) => (
            <div key={material.id} className="relative">
              <button
                onClick={() => onRemove(material.id)}
                className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-50"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
              <div className="p-4 border border-gray-200 rounded-lg">
                <img
                  src={material.image}
                  alt={material.name}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
                <h3 className="font-medium text-gray-900 mb-1">{material.name}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">
                    {material.rating} ({material.reviewCount})
                  </span>
                </div>
              </div>
            </div>
          ))}

          {materials.length < 4 && (
            <button
              onClick={onAdd}
              className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400"
            >
              <Plus className="h-6 w-6 text-gray-400" />
              <span className="ml-2 text-sm text-gray-600">Add Material</span>
            </button>
          )}
        </div>
      </div>

      {/* Comparison sections */}
      <div className="p-6 space-y-8">
        {/* Price comparison */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Price</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {materials.map((material) => (
              <div key={material.id} className="space-y-2">
                <div className="text-xl font-bold text-gray-900">
                  ETB {material.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                  per {material.unit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specifications comparison */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Specifications
          </h3>
          {Object.keys(materials[0]?.specifications || {}).map((spec) => (
            <div
              key={spec}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2 border-t border-gray-200"
            >
              <div className="text-sm text-gray-500">{spec}</div>
              {materials.map((material) => (
                <div
                  key={material.id}
                  className="text-sm font-medium text-gray-900"
                >
                  {material.specifications[spec]}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Seller comparison */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Seller</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {materials.map((material) => (
              <div key={material.id} className="space-y-2">
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">
                    {material.seller.name}
                  </span>
                  {material.seller.verified && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">
                    {material.seller.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery comparison */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Delivery</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {materials.map((material) => (
              <div key={material.id} className="space-y-2">
                <div className="text-sm text-gray-900">
                  {material.delivery.time}
                </div>
                <div className="text-sm text-gray-500">
                  ETB {material.delivery.cost.toLocaleString()} delivery fee
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action footer */}
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {materials.map((material) => (
            <div key={material.id}>
              <Button fullWidth>
                Select {material.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaterialComparison;