import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Calendar from 'react-calendar';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Truck, Clock, MapPin, Package, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface DeliverySchedulingProps {
  order: {
    id: string;
    material: {
      name: string;
      quantity: number;
      unit: string;
      weight: number;
    };
    seller: {
      name: string;
      location: {
        lat: number;
        lng: number;
      };
    };
  };
}

const DeliveryScheduling: React.FC<DeliverySchedulingProps> = ({ order }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [deliveryType, setDeliveryType] = useState('standard');
  const [vehicleType, setVehicleType] = useState('');

  const timeSlots = [
    { id: 'morning', label: 'Morning (8am-12pm)', price: 500 },
    { id: 'afternoon', label: 'Afternoon (12pm-4pm)', price: 500 },
    { id: 'evening', label: 'Evening (4pm-7pm)', price: 600 },
  ];

  const vehicleTypes = [
    { id: 'pickup', label: 'Standard Pickup', capacity: '1-2 tons', price: 800 },
    { id: 'small-lorry', label: 'Small Lorry', capacity: '3-5 tons', price: 1200 },
    { id: 'large-truck', label: 'Large Truck', capacity: '8-10 tons', price: 2000 },
  ];

  const onSubmit = (data: any) => {
    console.log('Scheduling data:', {
      ...data,
      deliveryType,
      selectedDate,
      selectedTimeSlot,
      vehicleType,
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Schedule Delivery
        </h1>
        <p className="text-sm text-gray-500">
          Order #{order.id} • {order.material.name}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            {/* Delivery type selection */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Select Delivery Type
              </h2>
              <div className="space-y-4">
                {['standard', 'express', 'scheduled', 'flexible'].map((type) => (
                  <label
                    key={type}
                    className={`
                      flex items-center p-4 border rounded-lg cursor-pointer
                      ${deliveryType === type ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                    `}
                  >
                    <input
                      type="radio"
                      name="deliveryType"
                      value={type}
                      checked={deliveryType === type}
                      onChange={(e) => setDeliveryType(e.target.value)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <div className="ml-3">
                      <span className="block text-sm font-medium text-gray-900">
                        {type.charAt(0).toUpperCase() + type.slice(1)} Delivery
                      </span>
                      <span className="block text-sm text-gray-500">
                        {type === 'standard' ? '2-3 business days' :
                         type === 'express' ? 'Next day delivery' :
                         type === 'scheduled' ? 'Choose your time slot' :
                         'Flexible timing, economy rate'}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Date selection */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Select Delivery Date
              </h2>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                minDate={new Date()}
                className="w-full rounded-lg border border-gray-200"
              />
            </div>

            {/* Time slot selection */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Select Time Slot
              </h2>
              <div className="space-y-4">
                {timeSlots.map((slot) => (
                  <label
                    key={slot.id}
                    className={`
                      flex items-center p-4 border rounded-lg cursor-pointer
                      ${selectedTimeSlot === slot.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                    `}
                  >
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot.id}
                      checked={selectedTimeSlot === slot.id}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <div className="ml-3 flex-1">
                      <span className="block text-sm font-medium text-gray-900">
                        {slot.label}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      ETB {slot.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Delivery location */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Delivery Location
              </h2>
              <div className="mb-4">
                <Input
                  label="Address"
                  {...register('address', { required: true })}
                  error={errors.address?.message}
                  leftIcon={<MapPin className="h-5 w-5 text-gray-400" />}
                />
              </div>
              <div className="h-64 rounded-lg overflow-hidden">
                <LoadScript googleMapsApiKey="YOUR_API_KEY">
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={order.seller.location}
                    zoom={13}
                  >
                    <Marker position={order.seller.location} />
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>

            {/* Vehicle type selection */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Select Vehicle Type
              </h2>
              <div className="space-y-4">
                {vehicleTypes.map((vehicle) => (
                  <label
                    key={vehicle.id}
                    className={`
                      flex items-center p-4 border rounded-lg cursor-pointer
                      ${vehicleType === vehicle.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                    `}
                  >
                    <input
                      type="radio"
                      name="vehicleType"
                      value={vehicle.id}
                      checked={vehicleType === vehicle.id}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <div className="ml-3 flex-1">
                      <span className="block text-sm font-medium text-gray-900">
                        {vehicle.label}
                      </span>
                      <span className="block text-sm text-gray-500">
                        Capacity: {vehicle.capacity}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      ETB {vehicle.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Special instructions */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Special Instructions
              </h2>
              <textarea
                {...register('instructions')}
                rows={4}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Add any special delivery instructions..."
              />
            </div>
          </div>
        </div>

        {/* Summary and actions */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Total Cost</h3>
              <p className="text-sm text-gray-500">
                Including delivery fee and vehicle charges
              </p>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ETB 2,500
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">
              Schedule Delivery
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeliveryScheduling;