import React from 'react';
import { CheckCircle, Clock, AlertCircle, Loader2, Info } from 'lucide-react';
import Button from '../ui/Button';
import { VerificationStatus as Status } from '../../types';
import { useAuth } from '../../context/AuthContext';

const VerificationStatus: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  const status = user.verificationStatus;
  
  const getStatusIcon = () => {
    switch (status) {
      case Status.PENDING:
        return <Clock className="h-12 w-12 text-yellow-500" />;
      case Status.UNDER_REVIEW:
        return <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />;
      case Status.APPROVED:
        return <CheckCircle className="h-12 w-12 text-green-500" />;
      case Status.REQUIRES_MORE_INFO:
        return <AlertCircle className="h-12 w-12 text-red-500" />;
      default:
        return <Info className="h-12 w-12 text-gray-500" />;
    }
  };
  
  const getStatusTitle = () => {
    switch (status) {
      case Status.PENDING:
        return 'Verification Pending';
      case Status.UNDER_REVIEW:
        return 'Under Review';
      case Status.APPROVED:
        return 'Verification Approved';
      case Status.REQUIRES_MORE_INFO:
        return 'Additional Information Required';
      default:
        return 'Verification Status';
    }
  };
  
  const getStatusDescription = () => {
    switch (status) {
      case Status.PENDING:
        return 'Your verification documents have been received and are waiting to be reviewed by our team.';
      case Status.UNDER_REVIEW:
        return 'Our team is currently reviewing your verification documents. This process typically takes 24-48 business hours.';
      case Status.APPROVED:
        return 'Congratulations! Your account has been fully verified. You now have access to all platform features.';
      case Status.REQUIRES_MORE_INFO:
        return 'We need additional information to complete your verification. Please check the details below.';
      default:
        return '';
    }
  };
  
  const getStatusColor = () => {
    switch (status) {
      case Status.PENDING:
        return 'bg-yellow-50 border-yellow-200';
      case Status.UNDER_REVIEW:
        return 'bg-blue-50 border-blue-200';
      case Status.APPROVED:
        return 'bg-green-50 border-green-200';
      case Status.REQUIRES_MORE_INFO:
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };
  
  const getEstimatedCompletion = () => {
    switch (status) {
      case Status.PENDING:
        return '48-72 hours';
      case Status.UNDER_REVIEW:
        return '24-48 hours';
      case Status.REQUIRES_MORE_INFO:
        return 'Pending your response';
      default:
        return '';
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Account Verification Status</h1>
        <p className="text-gray-600 mt-1">
          Track the progress of your account verification
        </p>
      </div>
      
      {/* Status card */}
      <div className={`p-6 rounded-lg border ${getStatusColor()} mb-8`}>
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-4 md:mb-0 md:mr-6">
            {getStatusIcon()}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">{getStatusTitle()}</h2>
            <p className="text-gray-700">{getStatusDescription()}</p>
          </div>
        </div>
      </div>
      
      {/* Verification progress */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Verification Progress</h3>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000" 
            style={{ 
              width: `${status === Status.APPROVED ? '100' : 
                     status === Status.UNDER_REVIEW ? '66' : 
                     status === Status.PENDING ? '33' : '50'}%` 
            }}
          ></div>
        </div>
        
        <div className="space-y-6">
          {/* Document verification step */}
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center bg-green-100 mt-0.5">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-3">
              <h4 className="text-base font-medium text-gray-900">Documents Received</h4>
              <p className="text-sm text-gray-500">We've received your verification documents</p>
            </div>
          </div>
          
          {/* Identity verification step */}
          <div className="flex items-start">
            <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center 
              ${status === Status.PENDING ? 'bg-gray-100' : 'bg-green-100'} mt-0.5`}>
              {status === Status.PENDING ? (
                <span className="h-4 w-4 text-gray-400 text-xs font-bold">2</span>
              ) : (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
            </div>
            <div className="ml-3">
              <h4 className="text-base font-medium text-gray-900">Document Review</h4>
              <p className="text-sm text-gray-500">Our team reviews your submitted documents</p>
            </div>
          </div>
          
          {/* Business verification step */}
          <div className="flex items-start">
            <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center 
              ${status === Status.APPROVED ? 'bg-green-100' : 'bg-gray-100'} mt-0.5`}>
              {status === Status.APPROVED ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <span className="h-4 w-4 text-gray-400 text-xs font-bold">3</span>
              )}
            </div>
            <div className="ml-3">
              <h4 className="text-base font-medium text-gray-900">Account Activation</h4>
              <p className="text-sm text-gray-500">Your account is verified and fully activated</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Estimated completion */}
      {status !== Status.APPROVED && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Estimated Completion</h3>
            <span className="text-blue-600 font-medium">{getEstimatedCompletion()}</span>
          </div>
          <p className="text-gray-600 text-sm">
            Verification times may vary based on document quality and completeness.
          </p>
        </div>
      )}
      
      {/* Additional information required */}
      {status === Status.REQUIRES_MORE_INFO && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-red-700 mb-4">Additional Information Required</h3>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div className="ml-3">
                <h4 className="text-base font-medium text-gray-900">Business License Issue</h4>
                <p className="text-sm text-gray-600">
                  The business license document you uploaded is too blurry to read. Please upload a clearer copy.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div className="ml-3">
                <h4 className="text-base font-medium text-gray-900">Tax ID Verification</h4>
                <p className="text-sm text-gray-600">
                  We need to verify your Tax ID. Please upload a copy of your tax registration certificate.
                </p>
              </div>
            </div>
          </div>
          
          <Button>
            Provide Additional Information
          </Button>
        </div>
      )}
      
      {/* Support contact */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
        <p className="text-gray-600 mb-4">
          If you have any questions about the verification process or need assistance, our support team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Button variant="outline">
            Contact Support
          </Button>
          <Button variant="link">
            View Verification FAQ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationStatus;