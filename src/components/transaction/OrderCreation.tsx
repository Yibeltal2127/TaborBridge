import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Truck, Clock, Package, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import ProgressIndicator from '../ui/ProgressIndicator';

interface OrderCreationProps {
  material: {
    id: string;
    name: string;
    image: string;
    price: number;
    unit: string;
    stock: number;
    minOrder: number;
    seller: {
      name: string;
      verified: boolean;
      rating: number;
    };
  };
}

const OrderCreation: React.FC<OrderCreationProps> = ({ material }) => {
  const [step, setStep] = useState(0);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    'Material Review',
    'Quantity & Delivery',
    'Payment',
    'Confirmation'
  ];

  const quantity = watch('quantity', material.minOrder);
  const deliveryMethod = watch('deliveryMethod', 'woye');

  const calculateTotal = () => {
    const subtotal = material.price * quantity;
    const deliveryFee = deliveryMethod === 'woye' ? 500 : 
                       deliveryMethod === 'seller' ? 800 : 0;
    return {
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee
    };
  };

  const onSubmit = async (data: any) => {
    setIsProcessing(true);
    try {
      // Submit order logic here
      console.log('Order data:', data);
    } catch (error) {
      console.error('Order creation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Create Order</h1>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </div>
          <ProgressIndicator steps={steps} currentStep={step} />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Main content */}
          <div className="col-span-2 space-y-6">
            {step === 0 && (
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={material.image}
                    alt={material.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      {material.name}
                    </h2>
                    <div className="mt-1 text-sm text-gray-500">
                      Seller: {material.seller.name}
                      {material.seller.verified && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-lg font-medium text-gray-900">
                      ETB {material.price.toLocaleString()} / {material.unit}
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Important Information
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Verify material specifications before ordering</li>
                          <li>Check delivery options and timeframes</li>
                          <li>Review seller's ratings and reviews</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="number"
                      {...register('quantity', {
                        required: true,
                        min: material.minOrder,
                        max: material.stock
                      })}
                      error={errors.quantity?.message}
                      leftIcon={<Package className="h-5 w-5 text-gray-400" />}
                    />
                    <div className="text-sm text-gray-500 pt-2">
                      Available: {material.stock} {material.unit}
                      <br />
                      Minimum order: {material.minOrder} {material.unit}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Method
                  </label>
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        {...register('deliveryMethod')}
                        value="woye"
                        className="h-4 w-4 text-blue-600"
                      />
                      <div className="ml-3">
                        <span className="block text-sm font-medium text-gray-900">
                          Woye Logistics
                        </span>
                        <span className="block text-sm text-gray-500">
                          1-2 business days • ETB 500
                        </span>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        {...register('deliveryMethod')}
                        value="seller"
                        className="h-4 w-4 text-blue-600"
                      />
                      <div className="ml-3">
                        <span className="block text-sm font-medium text-gray-900">
                          Seller Delivery
                        </span>
                        <span className="block text-sm text-gray-500">
                          2-3 business days • ETB 800
                        </span>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        {...register('deliveryMethod')}
                        value="pickup"
                        className="h-4 w-4 text-blue-600"
                      />
                      <div className="ml-3">
                        <span className="block text-sm font-medium text-gray-900">
                          Self Pickup
                        </span>
                        <span className="block text-sm text-gray-500">
                          Available immediately • Free
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address
                  </label>
                  <Input
                    {...register('address', { required: true })}
                    error={errors.address?.message}
                    leftIcon={<MapPin className="h-5 w-5 text-gray-400" />}
                    placeholder="Enter delivery address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Instructions
                  </label>
                  <textarea
                    {...register('instructions')}
                    rows={3}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Add any special delivery instructions..."
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Clock className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">
                        Payment Processing
                      </h3>
                      <div className="mt-2 text-sm text-blue-700">
                        Your payment will be held in escrow until you confirm receipt of the materials.
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        {...register('paymentMethod')}
                        value="telebirr"
                        className="h-4 w-4 text-blue-600"
                      />
                      <div className="ml-3">
                        <span className="block text-sm font-medium text-gray-900">
                          Telebirr
                        </span>
                        <span className="block text-sm text-gray-500">
                          Instant payment • No fees
                        </span>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        {...register('paymentMethod')}
                        value="cbe"
                        className="h-4 w-4 text-blue-600"
                      />
                      <div className="ml-3">
                        <span className="block text-sm font-medium text-gray-900">
                          CBE Birr
                        </span>
                        <span className="block text-sm text-gray-500">
                          Instant payment • No fees
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        Order Summary
                      </h3>
                      <div className="mt-2 text-sm text-green-700">
                        Please review your order details before confirming.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <dl className="divide-y divide-gray-200">
                    <div className="py-3 flex justify-between text-sm">
                      <dt className="text-gray-500">Material</dt>
                      <dd className="text-gray-900 font-medium">{material.name}</dd>
                    </div>
                    <div className="py-3 flex justify-between text-sm">
                      <dt className="text-gray-500">Quantity</dt>
                      <dd className="text-gray-900">{quantity} {material.unit}</dd>
                    </div>
                    <div className="py-3 flex justify-between text-sm">
                      <dt className="text-gray-500">Unit Price</dt>
                      <dd className="text-gray-900">ETB {material.price.toLocaleString()}</dd>
                    </div>
                    <div className="py-3 flex justify-between text-sm">
                      <dt className="text-gray-500">Delivery Method</dt>
                      <dd className="text-gray-900">{deliveryMethod}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="text-sm font-medium text-gray-900">
                    ETB {calculateTotal().subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Delivery Fee</span>
                  <span className="text-sm font-medium text-gray-900">
                    ETB {calculateTotal().deliveryFee.toLocaleString()}
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-900">Total</span>
                    <span className="text-base font-medium text-gray-900">
                      ETB {calculateTotal().total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    fullWidth
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    isLoading={isProcessing}
                  >
                    Place Order
                  </Button>
                )}

                {step > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    fullWidth
                    className="mt-3"
                  >
                    Back
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderCreation;