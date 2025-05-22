import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { Truck, Phone, MessageCircle, MapPin, Clock, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';

interface DeliveryTrackingProps {
  delivery: {
    id: string;
    status: 'pending' | 'pickup' | 'in_transit' | 'delivered';
    origin: {
      address: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
    destination: {
      address: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
    currentLocation?: {
      lat: number;
      lng: number;
    };
    eta?: string;
    driver?: {
      name: string;
      phone: string;
      photo: string;
    };
    vehicle?: {
      type: string;
      plate: string;
    };
  };
}

const DeliveryTracking: React.FC<DeliveryTrackingProps> = ({ delivery }) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (delivery.currentLocation) {
      const directionsService = new google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin: delivery.currentLocation,
          destination: delivery.destination.coordinates,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          }
          setIsLoading(false);
        }
      );
    }
  }, [delivery.currentLocation]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'pickup':
        return 'bg-blue-100 text-blue-800';
      case 'in_transit':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Track Delivery
          </h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(delivery.status)}`}>
            {delivery.status.replace('_', ' ').charAt(0).toUpperCase() + delivery.status.slice(1)}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          Delivery ID: {delivery.id}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 p-6">
        {/* Map */}
        <div className="col-span-2">
          <div className="h-96 rounded-lg overflow-hidden">
            <LoadScript googleMapsApiKey="YOUR_API_KEY">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={delivery.currentLocation || delivery.destination.coordinates}
                zoom={13}
              >
                {delivery.currentLocation && (
                  <Marker
                    position={delivery.currentLocation}
                    icon={{
                      url: '/truck-icon.png',
                      scaledSize: new google.maps.Size(32, 32),
                    }}
                  />
                )}
                <Marker position={delivery.origin.coordinates} />
                <Marker position={delivery.destination.coordinates} />
                {directions && (
                  <DirectionsRenderer
                    directions={directions}
                    options={{
                      suppressMarkers: true,
                      polylineOptions: {
                        strokeColor: '#0C4DA2',
                        strokeWeight: 5,
                      },
                    }}
                  />
                )}
              </GoogleMap>
            </LoadScript>
          </div>

          {/* ETA and status */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-500">
                  Estimated arrival:
                </span>
                <span className="ml-2 text-sm font-medium text-gray-900">
                  {delivery.eta}
                </span>
              </div>
              {delivery.status === 'in_transit' && (
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <span className="ml-2 text-sm text-yellow-700">
                    In transit to destination
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delivery details */}
        <div className="col-span-1">
          {delivery.driver && (
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Driver Information
              </h2>
              <div className="flex items-center mb-4">
                <img
                  src={delivery.driver.photo}
                  alt={delivery.driver.name}
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">
                    {delivery.driver.name}
                  </div>
                  {delivery.vehicle && (
                    <div className="text-sm text-gray-500">
                      {delivery.vehicle.type} • {delivery.vehicle.plate}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1 flex items-center justify-center"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 flex items-center justify-center"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Pickup Location
              </h3>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                <span className="ml-2 text-sm text-gray-600">
                  {delivery.origin.address}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Delivery Location
              </h3>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                <span className="ml-2 text-sm text-gray-600">
                  {delivery.destination.address}
                </span>
              </div>
            </div>
          </div>

          {delivery.status === 'in_transit' && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                Delivery Updates
              </h3>
              <p className="text-sm text-blue-700">
                You'll receive notifications when:
              </p>
              <ul className="mt-2 text-sm text-blue-700 list-disc list-inside">
                <li>Driver is approaching</li>
                <li>Delivery is completed</li>
                <li>Any delays or issues occur</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;