import React, { useState } from 'react';
import { User, CheckCircle, Clock } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import DocumentUpload from '../ui/DocumentUpload';
import { useAuth } from '../../context/AuthContext';

const ProfileCompletion: React.FC = () => {
  const { user, updateProfile, isLoading } = useAuth();
  
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    businessDescription: user?.businessName || '',
    contactPersonName: '',
    contactPersonRole: '',
    contactPersonPhone: '',
    contactPersonEmail: '',
    operatingHours: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
    },
  });
  
  const profileCompletionItems = [
    {
      id: 'profile_pic',
      title: 'Profile Picture',
      description: 'Add a professional profile picture or logo',
      isCompleted: !!profilePicture,
      points: 10,
    },
    {
      id: 'business_desc',
      title: 'Business Description',
      description: 'Describe your business in detail',
      isCompleted: !!formData.businessDescription,
      points: 15,
    },
    {
      id: 'contact_person',
      title: 'Contact Person',
      description: 'Add contact information for key personnel',
      isCompleted: !!formData.contactPersonName && !!formData.contactPersonPhone,
      points: 10,
    },
    {
      id: 'operating_hours',
      title: 'Operating Hours',
      description: 'Specify your business operating hours',
      isCompleted: !!formData.operatingHours,
      points: 5,
    },
    {
      id: 'social_media',
      title: 'Social Media',
      description: 'Connect your social media accounts',
      isCompleted: !!formData.socialMedia.facebook || !!formData.socialMedia.twitter || 
                  !!formData.socialMedia.instagram || !!formData.socialMedia.linkedin,
      points: 10,
    },
  ];
  
  const completedPoints = profileCompletionItems
    .filter(item => item.isCompleted)
    .reduce((sum, item) => sum + item.points, 0);
  
  const totalPoints = profileCompletionItems
    .reduce((sum, item) => sum + item.points, 0);
  
  const completionPercentage = Math.round((completedPoints / totalPoints) * 100);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested fields (like socialMedia.facebook)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleProfilePictureChange = (file: File | null) => {
    setProfilePicture(file);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateProfile({
        ...user,
        profileCompletion: completionPercentage,
        // In a real app, we would upload the profile picture and get a URL
        // Then include other fields from formData
      });
      
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
        <p className="text-gray-600 mt-1">
          Enhance your TaborBridge experience by completing your profile
        </p>
      </div>
      
      {/* Progress indicator */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Profile Completion</h2>
          <span className="text-lg font-bold text-blue-600">{completionPercentage}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profileCompletionItems.map((item) => (
            <div 
              key={item.id} 
              className={`p-4 rounded-lg border ${item.isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {item.isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.description}</p>
                  <p className="text-xs font-medium text-blue-600 mt-1">+{item.points} points</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Profile form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-6">Profile Information</h2>
        
        {/* Profile picture */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Picture
          </label>
          <div className="flex items-center">
            <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
              {profilePicture ? (
                <img 
                  src={URL.createObjectURL(profilePicture)} 
                  alt="Profile" 
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-gray-400" />
              )}
            </div>
            <DocumentUpload
              label=""
              onChange={handleProfilePictureChange}
              accept=".jpg,.jpeg,.png"
              value={profilePicture}
              containerClassName="flex-grow"
            />
          </div>
        </div>
        
        {/* Business description */}
        <div className="mb-6">
          <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Business Description
          </label>
          <textarea
            id="businessDescription"
            name="businessDescription"
            rows={4}
            value={formData.businessDescription}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Describe your business, products, services, and what makes you unique..."
          ></textarea>
        </div>
        
        {/* Contact person */}
        <div className="mb-6">
          <h3 className="text-md font-medium text-gray-900 mb-3">Contact Person</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Name"
              name="contactPersonName"
              value={formData.contactPersonName}
              onChange={handleChange}
              placeholder="Full name"
            />
            
            <Input
              label="Role/Position"
              name="contactPersonRole"
              value={formData.contactPersonRole}
              onChange={handleChange}
              placeholder="e.g., Manager, Owner"
            />
            
            <Input
              label="Phone Number"
              name="contactPersonPhone"
              value={formData.contactPersonPhone}
              onChange={handleChange}
              placeholder="+251 91 234 5678"
            />
            
            <Input
              label="Email"
              name="contactPersonEmail"
              value={formData.contactPersonEmail}
              onChange={handleChange}
              placeholder="contact@example.com"
            />
          </div>
        </div>
        
        {/* Operating hours */}
        <div className="mb-6">
          <label htmlFor="operatingHours" className="block text-sm font-medium text-gray-700 mb-1">
            Operating Hours
          </label>
          <textarea
            id="operatingHours"
            name="operatingHours"
            rows={2}
            value={formData.operatingHours}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., Monday-Friday: 9AM-5PM, Saturday: 10AM-2PM, Sunday: Closed"
          ></textarea>
        </div>
        
        {/* Social media */}
        <div className="mb-6">
          <h3 className="text-md font-medium text-gray-900 mb-3">Social Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Facebook"
              name="socialMedia.facebook"
              value={formData.socialMedia.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/yourbusiness"
            />
            
            <Input
              label="Twitter"
              name="socialMedia.twitter"
              value={formData.socialMedia.twitter}
              onChange={handleChange}
              placeholder="https://twitter.com/yourbusiness"
            />
            
            <Input
              label="Instagram"
              name="socialMedia.instagram"
              value={formData.socialMedia.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/yourbusiness"
            />
            
            <Input
              label="LinkedIn"
              name="socialMedia.linkedin"
              value={formData.socialMedia.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/company/yourbusiness"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button variant="outline" type="button">
            Save as Draft
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileCompletion;