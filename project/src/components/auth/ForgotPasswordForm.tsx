import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const ForgotPasswordForm: React.FC = () => {
  const { requestPasswordReset, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const validate = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        await requestPasswordReset(email);
        setIsSubmitted(true);
      } catch (error) {
        setError('Failed to send reset link. Please try again.');
      }
    }
  };
  
  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-md w-full mx-auto">
      {!isSubmitted ? (
        <>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <div className="h-8 w-8 bg-[#0C4DA2] rounded-md flex items-center justify-center">
                <span className="text-white font-bold">TB</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Reset your password</h2>
            <p className="text-gray-600 mt-1">
              Enter your email and we'll send you a link to reset your password
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              error={error}
              leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
              placeholder="your@email.com"
              required
            />
            
            <Button type="submit" fullWidth isLoading={isLoading}>
              Send reset link
            </Button>
            
            <div className="text-center">
              <a href="/login" className="text-sm font-medium text-[#0C4DA2] hover:text-[#0A3F87]">
                Back to sign in
              </a>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to <span className="font-medium">{email}</span>
          </p>
          <p className="text-gray-500 text-sm mb-6">
            If you don't see it, check your spam folder. The link will expire in 1 hour.
          </p>
          
          <Button 
            variant="outline" 
            onClick={() => setIsSubmitted(false)}
          >
            Try a different email
          </Button>
          
          <div className="mt-6">
            <a href="/login" className="text-sm font-medium text-[#0C4DA2] hover:text-[#0A3F87]">
              Back to sign in
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;