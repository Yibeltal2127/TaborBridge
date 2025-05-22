import React, { useState, useRef } from 'react';
import { QRCode } from 'qrcode.react';
import SignaturePad from 'signature_pad';
import { Camera, CheckCircle, Upload, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import DocumentUpload from '../ui/DocumentUpload';

interface DeliveryConfirmationProps {
  delivery: {
    id: string;
    material: {
      name: string;
      quantity: number;
      unit: string;
    };
    driver: {
      name: string;
      id: string;
    };
    timestamp: string;
    location: {
      lat: number;
      lng: number;
      address: string;
    };
  };
  onConfirm: (data: any) => void;
}

const DeliveryConfirmation: React.FC<DeliveryConfirmationProps> = ({
  delivery,
  onConfirm,
}) => {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<File[]>([]);
  const [signature, setSignature] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const signaturePadRef = useRef<HTMLCanvasElement>(null);
  const signaturePadInstance = useRef<SignaturePad | null>(null);

  const initializeSignaturePad = () => {
    if (signaturePadRef.current) {
      signaturePadInstance.current = new SignaturePad(signaturePadRef.current);
    }
  };

  const clearSignature = () => {
    if (signaturePadInstance.current) {
      signaturePadInstance.current.clear();
      setSignature(null);
    }
  };

  const saveSignature = () => {
    if (signaturePadInstance.current && !signaturePadInstance.current.isEmpty()) {
      setSignature(signaturePadInstance.current.toDataURL());
    }
  };

  const handlePhotoUpload = (file: File) => {
    setPhotos(prev => [...prev, file]);
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      await onConfirm({
        deliveryId: delivery.id,
        photos,
        signature,
        verificationCode,
        timestamp: new Date().toISOString(),
        location: delivery.location,
      });
      setStep(4); // Success step
    } catch (error) {
      console.error('Confirmation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Confirm Delivery
        </h1>
        <p className="text-sm text-gray-500">
          Delivery ID: {delivery.id}
        </p>
      </div>

      <div className="p-6">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">
              Step 1: Document Delivery
            </h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Important
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    Please take clear photos of:
                    <ul className="list-disc pl-5 mt-1">
                      <li>The delivered materials</li>
                      <li>Placement location</li>
                      <li>Any visible damage (if applicable)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <DocumentUpload
              label="Upload Delivery Photos"
              accept="image/*"
              onChange={handlePhotoUpload}
              description="Take clear photos of the delivered materials"
            />

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Skip Photos
              </Button>
              <Button 
                onClick={() => setStep(2)}
                disabled={photos.length === 0}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">
              Step 2: Digital Signature
            </h2>

            <div className="border-2 border-gray-300 rounded-lg p-4">
              <canvas
                ref={signaturePadRef}
                className="w-full h-48 border rounded touch-none"
                onMouseDown={initializeSignaturePad}
              />
              
              <div className="flex justify-end mt-2 space-x-2">
                <Button variant="outline" onClick={clearSignature}>
                  Clear
                </Button>
                <Button onClick={saveSignature}>
                  Save Signature
                </Button>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                onClick={() => setStep(3)}
                disabled={!signature}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">
              Step 3: Verify Delivery
            </h2>

            <div className="flex justify-center mb-6">
              <QRCode 
                value={`DELIVERY-${delivery.id}`}
                size={200}
                level="H"
              />
            </div>

            <div className="text-center mb-6">
              <p className="text-sm text-gray-500">
                Ask the delivery agent to scan this QR code or enter the verification code:
              </p>
              <p className="text-2xl font-mono font-bold text-gray-900 mt-2 tracking-wider">
                {delivery.id.slice(-6)}
              </p>
            </div>

            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter verification code"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!verificationCode}
                isLoading={isProcessing}
              >
                Confirm Delivery
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>
            
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Delivery Confirmed
            </h2>
            
            <p className="text-sm text-gray-500 mb-6">
              Thank you for confirming the delivery. The payment will be released to the seller.
            </p>

            <Button onClick={() => window.location.href = '/orders'}>
              View Order Details
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryConfirmation;