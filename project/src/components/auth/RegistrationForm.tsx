import React, { useState } from 'react';
import { CheckCircle2, Mail, Phone, Building, MapPin, FileText } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import ProgressIndicator from '../ui/ProgressIndicator';
import DocumentUpload from '../ui/DocumentUpload';
import { UserRole, BusinessType } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface RegistrationFormProps {
  role: UserRole;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ role }) => {
  const { register, isLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    role,
    
    // Business details
    businessName: '',
    businessType: BusinessType.SMALL_BUSINESS,
    businessAddress: '',
    businessLicense: '',
    taxId: '',
    industry: '',
    
    // Seller specific (inventory capacity)
    materialCategories: [] as string[],
    warehouseLocations: [] as string[],
    deliveryRadius: 0,
    vehicleTypes: [] as string[],
    
    // Documents
    businessLicenseDoc: null as File | null,
    taxClearanceDoc: null as File | null,
    qualityCertificationsDoc: null as File | null,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Determine step count based on role
  const steps = role === UserRole.BUYER 
    ? ['Basic Info', 'Business Details', 'Verification'] 
    : ['Basic Info', 'Business Details', 'Inventory Capacity', 'Verification'];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      // This is handled by DocumentUpload component
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleDocumentUpload = (fieldName: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [fieldName]: file }));
  };
  
  const handleMaterialCategoryChange = (category: string) => {
    setFormData(prev => {
      const categories = prev.materialCategories.includes(category)
        ? prev.materialCategories.filter(c => c !== category)
        : [...prev.materialCategories, category];
      
      return { ...prev, materialCategories: categories };
    });
  };
  
  const handleVehicleTypeChange = (type: string) => {
    setFormData(prev => {
      const types = prev.vehicleTypes.includes(type)
        ? prev.vehicleTypes.filter(t => t !== type)
        : [...prev.vehicleTypes, type];
      
      return { ...prev, vehicleTypes: types };
    });
  };
  
  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 0) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    } else if (step === 1) {
      if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
      if (!formData.businessAddress.trim()) newErrors.businessAddress = 'Business address is required';
      if (!formData.businessLicense.trim()) newErrors.businessLicense = 'Business license number is required';
      if (!formData.taxId.trim()) newErrors.taxId = 'Tax ID is required';
      if (!formData.industry.trim()) newErrors.industry = 'Industry selection is required';
    } else if (step === 2 && role === UserRole.SELLER) {
      if (formData.materialCategories.length === 0) newErrors.materialCategories = 'Select at least one material category';
      if (formData.warehouseLocations.length === 0 || !formData.warehouseLocations[0]) newErrors.warehouseLocations = 'At least one warehouse location is required';
      if (formData.deliveryRadius <= 0) newErrors.deliveryRadius = 'Delivery radius must be greater than 0';
      if (formData.vehicleTypes.length === 0) newErrors.vehicleTypes = 'Select at least one vehicle type';
    } else if ((step === 2 && role === UserRole.BUYER) || (step === 3 && role === UserRole.SELLER)) {
      if (!formData.businessLicenseDoc) newErrors.businessLicenseDoc = 'Business license document is required';
      if (!formData.taxClearanceDoc) newErrors.taxClearanceDoc = 'Tax clearance document is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateStep(currentStep)) {
      try {
        // In a real app, we would upload the documents to cloud storage and get URLs
        await register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          mobile: formData.mobile,
          role: formData.role,
          businessName: formData.businessName,
          businessType: formData.businessType,
          businessAddress: formData.businessAddress,
          businessLicense: formData.businessLicense,
          taxId: formData.taxId,
          industry: formData.industry,
          materialCategories: formData.materialCategories,
          warehouseLocations: formData.warehouseLocations,
          deliveryCapabilities: {
            radius: formData.deliveryRadius,
            vehicleTypes: formData.vehicleTypes,
          },
          documents: {
            businessLicense: 'uploaded-doc-url',
            taxClearance: 'uploaded-doc-url',
            qualityCertifications: formData.qualityCertificationsDoc ? 'uploaded-doc-url' : undefined,
          },
        }, formData.password);
        
        // On successful registration, the user will be redirected to the dashboard
        window.location.href = '/verification-status';
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {role === UserRole.BUYER ? 'Buyer Registration' : 'Seller Registration'}
      </h2>
      
      <ProgressIndicator steps={steps} currentStep={currentStep} className="mb-8" />
      
      <form onSubmit={handleSubmit}>
        {/* Step 1: Basic Info */}
        {currentStep === 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                required
              />
              
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                required
              />
            </div>
            
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
              required
              helpText="We'll send a verification link to this email"
            />
            
            <Input
              label="Mobile Number"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              error={errors.mobile}
              leftIcon={<Phone className="h-5 w-5 text-gray-400" />}
              required
              helpText="Format: +251 91 234 5678"
            />
            
            <Input
              label="Create Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
              helpText="At least 8 characters with a mix of letters, numbers, and symbols"
            />
            
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />
            
            <div className="flex items-start mt-4">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-1"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-600 mt-1">{errors.agreeToTerms}</p>
            )}
          </div>
        )}
        
        {/* Step 2: Business Details */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Business Details</h3>
            
            <Input
              label="Business Name"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              error={errors.businessName}
              leftIcon={<Building className="h-5 w-5 text-gray-400" />}
              required
            />
            
            <div className="mb-4">
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                Business Type
              </label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value={BusinessType.INDIVIDUAL}>Individual</option>
                <option value={BusinessType.SMALL_BUSINESS}>Small Business</option>
                <option value={BusinessType.MEDIUM_BUSINESS}>Medium Business</option>
                <option value={BusinessType.LARGE_BUSINESS}>Large Business</option>
              </select>
            </div>
            
            <Input
              label="Business Address"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleChange}
              error={errors.businessAddress}
              leftIcon={<MapPin className="h-5 w-5 text-gray-400" />}
              required
              helpText="Physical location of your business"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Business License Number"
                name="businessLicense"
                value={formData.businessLicense}
                onChange={handleChange}
                error={errors.businessLicense}
                leftIcon={<FileText className="h-5 w-5 text-gray-400" />}
                required
              />
              
              <Input
                label="Tax Identification Number"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                error={errors.taxId}
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                Industry/Sector
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select an industry</option>
                <option value="residential_construction">Residential Construction</option>
                <option value="commercial_construction">Commercial Construction</option>
                <option value="industrial_construction">Industrial Construction</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="interior_design">Interior Design</option>
                <option value="architecture">Architecture</option>
                <option value="other">Other</option>
              </select>
              {errors.industry && (
                <p className="text-sm text-red-600 mt-1">{errors.industry}</p>
              )}
            </div>
          </div>
        )}
        
        {/* Step 3: Inventory Capacity (Sellers only) */}
        {currentStep === 2 && role === UserRole.SELLER && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Inventory Capacity</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material Categories
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Cement', 'Steel', 'Aggregates', 'Bricks', 'Wood', 'Tiles', 'Glass', 'Paints', 'Electrical', 'Plumbing'].map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      id={`category-${category}`}
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      checked={formData.materialCategories.includes(category)}
                      onChange={() => handleMaterialCategoryChange(category)}
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              {errors.materialCategories && (
                <p className="text-sm text-red-600 mt-1">{errors.materialCategories}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Warehouse Locations (multiple entries allowed)
              </label>
              <div className="space-y-2">
                {formData.warehouseLocations.length === 0 && (
                  <Input
                    label=""
                    name="warehouseLocation"
                    value=""
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        warehouseLocations: [value]
                      }));
                    }}
                    placeholder="Enter warehouse location"
                    error={errors.warehouseLocations}
                  />
                )}
                
                {formData.warehouseLocations.map((location, index) => (
                  <div key={index} className="flex items-center">
                    <Input
                      label=""
                      name={`warehouseLocation-${index}`}
                      value={location}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData(prev => {
                          const newLocations = [...prev.warehouseLocations];
                          newLocations[index] = value;
                          return { ...prev, warehouseLocations: newLocations };
                        });
                      }}
                      placeholder="Enter warehouse location"
                      containerClassName="flex-grow mr-2"
                    />
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          warehouseLocations: prev.warehouseLocations.filter((_, i) => i !== index)
                        }));
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      warehouseLocations: [...prev.warehouseLocations, '']
                    }));
                  }}
                >
                  + Add another location
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="deliveryRadius" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Radius (km)
              </label>
              <input
                id="deliveryRadius"
                name="deliveryRadius"
                type="number"
                min="0"
                value={formData.deliveryRadius}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.deliveryRadius && (
                <p className="text-sm text-red-600 mt-1">{errors.deliveryRadius}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Types
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Small Truck', 'Medium Truck', 'Large Truck', 'Pickup', 'Motorcycle'].map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      id={`vehicle-${type}`}
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      checked={formData.vehicleTypes.includes(type)}
                      onChange={() => handleVehicleTypeChange(type)}
                    />
                    <label htmlFor={`vehicle-${type}`} className="ml-2 text-sm text-gray-700">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
              {errors.vehicleTypes && (
                <p className="text-sm text-red-600 mt-1">{errors.vehicleTypes}</p>
              )}
            </div>
          </div>
        )}
        
        {/* Step 3 (Buyer) or Step 4 (Seller): Verification */}
        {((currentStep === 2 && role === UserRole.BUYER) || (currentStep === 3 && role === UserRole.SELLER)) && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Verification Documents</h3>
            <p className="text-sm text-gray-500 mb-6">
              Please upload the following documents to verify your business. All documents must be clear, legible, and in PDF, JPG, or PNG format.
            </p>
            
            <DocumentUpload
              label="Business License"
              description="Upload a copy of your valid business license"
              onChange={(file) => handleDocumentUpload('businessLicenseDoc', file)}
              error={errors.businessLicenseDoc}
              value={formData.businessLicenseDoc}
            />
            
            <DocumentUpload
              label="Tax Clearance Certificate"
              description="Upload your latest tax clearance certificate"
              onChange={(file) => handleDocumentUpload('taxClearanceDoc', file)}
              error={errors.taxClearanceDoc}
              value={formData.taxClearanceDoc}
            />
            
            <DocumentUpload
              label="Quality Certifications (Optional)"
              description="Upload any quality certifications your business has obtained"
              onChange={(file) => handleDocumentUpload('qualityCertificationsDoc', file)}
              value={formData.qualityCertificationsDoc}
            />
            
            {role === UserRole.SELLER && (
              <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                <h4 className="text-md font-medium text-blue-800 mb-2">Seller Account Terms</h4>
                <p className="text-sm text-blue-700 mb-4">
                  By submitting your application for a seller account, you agree to our seller terms and commission structure:
                </p>
                <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                  <li>Standard commission: 5% on all transactions</li>
                  <li>Payment processing fee: 2.5% + 5 ETB per transaction</li>
                  <li>Payment settlement: Every 7 days</li>
                  <li>Minimum withdrawal amount: 1,000 ETB</li>
                </ul>
                <div className="mt-4 flex items-start">
                  <input
                    id="agreeSeller"
                    name="agreeSeller"
                    type="checkbox"
                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-1"
                    checked
                    readOnly
                  />
                  <label htmlFor="agreeSeller" className="ml-2 block text-sm text-blue-700">
                    I agree to the TaborBridge Seller Terms and commission structure
                  </label>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
            >
              Back
            </Button>
          )}
          
          {((currentStep === 2 && role === UserRole.BUYER) || (currentStep === 3 && role === UserRole.SELLER)) ? (
            <Button 
              type="submit" 
              isLoading={isLoading}
              className="ml-auto"
            >
              Complete Registration
            </Button>
          ) : (
            <Button 
              type="button" 
              onClick={nextStep}
              className="ml-auto"
            >
              Next Step
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;