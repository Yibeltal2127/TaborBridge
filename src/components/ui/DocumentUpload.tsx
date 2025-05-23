import React, { useState } from 'react';
import { Upload, X, Check, AlertCircle } from 'lucide-react';

interface DocumentUploadProps {
  label: string;
  description?: string;
  onChange: (file: File | null) => void;
  accept?: string;
  error?: string;
  value?: File | string | null;
  status?: 'pending' | 'approved' | 'rejected' | 'uploading';
  rejectionReason?: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  label,
  description,
  onChange,
  accept = ".pdf,.jpg,.jpeg,.png",
  error,
  value,
  status = 'pending',
  rejectionReason,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileChange(file);
    }
  };
  
  const handleFileChange = (file: File) => {
    // Simulate upload
    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      onChange(file);
    }, 1000);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileChange(e.target.files[0]);
    }
  };
  
  const handleRemove = () => {
    onChange(null);
  };
  
  // Determine if we have a file (either File object or string URL)
  const hasFile = value !== null && value !== undefined;
  
  // Get file name
  const fileName = typeof value === 'string' 
    ? value.split('/').pop() 
    : value instanceof File 
      ? value.name 
      : '';
  
  // Status colors
  const statusColors = {
    pending: 'bg-gray-100 text-gray-600 border-gray-300',
    approved: 'bg-green-50 text-green-600 border-green-200',
    rejected: 'bg-red-50 text-red-600 border-red-200',
    uploading: 'bg-blue-50 text-blue-600 border-blue-200',
  };
  
  // Status indicators
  const statusIcons = {
    pending: null,
    approved: <Check className="w-5 h-5 text-green-500" />,
    rejected: <AlertCircle className="w-5 h-5 text-red-500" />,
    uploading: (
      <svg className="animate-spin w-5 h-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    ),
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {status !== 'pending' && (
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )}
      </div>
      
      {description && (
        <p className="text-sm text-gray-500 mb-2">{description}</p>
      )}
      
      {hasFile ? (
        <div 
          className={`
            p-4 border-2 rounded-lg flex items-center justify-between
            ${statusColors[status]}
            transition-all duration-200
          `}
        >
          <div className="flex items-center">
            <div className="mr-3">
              {isUploading ? statusIcons.uploading : statusIcons[status]}
            </div>
            <div>
              <p className="text-sm font-medium truncate max-w-xs">{fileName}</p>
              {status === 'rejected' && rejectionReason && (
                <p className="text-xs text-red-500">{rejectionReason}</p>
              )}
            </div>
          </div>
          
          {status === 'pending' && (
            <button 
              type="button" 
              className="text-gray-400 hover:text-gray-500"
              onClick={handleRemove}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-6
            flex flex-col items-center justify-center
            cursor-pointer group
            transition-all duration-200
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${error ? 'border-red-300 bg-red-50' : ''}
          `}
        >
          <div className="mb-3">
            <Upload 
              className={`
                w-8 h-8 mx-auto 
                ${isDragging ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}
                ${error ? 'text-red-400' : ''}
              `} 
            />
          </div>
          
          <div className="space-y-1 text-center">
            <p className="text-sm text-gray-500">
              <span className="font-medium text-blue-600">Upload a file</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">{accept.split(',').join(', ')} up to 10MB</p>
          </div>
          
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleChange}
            id={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
          />
          
          <label
            htmlFor={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
            className="mt-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          >
            Select file
          </label>
        </div>
      )}
      
      {error && !hasFile && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default DocumentUpload;