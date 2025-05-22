import React, { useState } from 'react';
import { Shield, Clock, AlertCircle, CheckCircle, Smartphone } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface EscrowPaymentProps {
  orderId: string;
  amount: number;
  expiresIn: number;
}

const EscrowPayment: React.FC<EscrowPaymentProps> = ({
  orderId,
  amount,
  expiresIn,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('telebirr');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'method' | 'process' | 'confirm'>('method');

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Payment processing logic here
      setStep('confirm');
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Secure Payment</h1>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-5 w-5 mr-1" />
            Expires in {expiresIn} minutes
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Order ID: {orderId}</span>
          <span className="font-medium text-gray-900">
            Amount: ETB {amount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Security notice */}
      <div className="p-4 bg-blue-50 border-b border-blue-100">
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Secure Escrow Payment
            </h3>
            <p className="mt-1 text-sm text-blue-600">
              Your payment is protected. Funds will be held in escrow until you confirm receipt of materials.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {step === 'method' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Select Payment Method
              </h2>

              <div className="space-y-4">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="telebirr"
                    checked={paymentMethod === 'telebirr'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-gray-900">
                      Telebirr
                    </span>
                    <span className="block text-sm text-gray-500">
                      Pay instantly with your Telebirr account
                    </span>
                  </div>
                  <div className="ml-auto">
                    <img
                      src="path/to/telebirr-logo.png"
                      alt="Telebirr"
                      className="h-8 w-auto"
                    />
                  </div>
                </label>

                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cbe"
                    checked={paymentMethod === 'cbe'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-gray-900">
                      CBE Birr
                    </span>
                    <span className="block text-sm text-gray-500">
                      Pay with your CBE Birr account
                    </span>
                  </div>
                  <div className="ml-auto">
                    <img
                      src="path/to/cbe-logo.png"
                      alt="CBE Birr"
                      className="h-8 w-auto"
                    />
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <Input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="+251 91 234 5678"
                leftIcon={<Smartphone className="h-5 w-5 text-gray-400" />}
              />
            </div>

            <Button
              onClick={() => setStep('process')}
              fullWidth
              disabled={!mobileNumber}
            >
              Continue to Payment
            </Button>
          </div>
        )}

        {step === 'process' && (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Processing Payment
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Please confirm the payment on your {paymentMethod} app
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="text-2xl font-bold mb-2">
                ETB {amount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                to TaborBridge Escrow
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setStep('method')}
              className="mr-4"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              isLoading={isProcessing}
            >
              I've Completed Payment
            </Button>
          </div>
        )}

        {step === 'confirm' && (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Payment Successful
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Your payment has been processed and is being held in escrow
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <dl className="divide-y divide-gray-200">
                <div className="py-3 flex justify-between text-sm">
                  <dt className="text-gray-500">Transaction ID</dt>
                  <dd className="text-gray-900 font-medium">TXN-{orderId}</dd>
                </div>
                <div className="py-3 flex justify-between text-sm">
                  <dt className="text-gray-500">Amount Paid</dt>
                  <dd className="text-gray-900 font-medium">
                    ETB {amount.toLocaleString()}
                  </dd>
                </div>
                <div className="py-3 flex justify-between text-sm">
                  <dt className="text-gray-500">Payment Method</dt>
                  <dd className="text-gray-900 font-medium">{paymentMethod}</dd>
                </div>
              </dl>
            </div>

            <Button onClick={() => window.location.href = '/orders'}>
              View Order Details
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-6 bg-gray-50">
        <div className="flex items-center justify-center space-x-4">
          <Shield className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-500">
            Secured by TaborBridge Escrow Protection
          </span>
        </div>
      </div>
    </div>
  );
};

export default EscrowPayment;