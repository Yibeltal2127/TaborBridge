import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Plus, Info } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface MaterialListingFormData {
  category: string;
  name: string;
  brand: string;
  model: string;
  manufacturingDate: string;
  origin: string;
  condition: 'new' | 'used' | 'surplus';
  specifications: Record<string, string>;
  price: number;
  unit: string;
  quantity: number;
  minOrder: number;
  location: string;
  deliveryRadius: number;
  preparationTime: number;
}

const MaterialListingForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<MaterialListingFormData>();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [specifications, setSpecifications] = useState<{key: string; value: string}[]>([
    { key: '', value: '' }
  ]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      setImages([...images, ...acceptedFiles].slice(0, 5));
    }
  });

  const addSpecification = () => {
    setSpecifications([...specifications, { key: '', value: '' }]);
  };

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmit = (data: MaterialListingFormData) => {
    console.log('Form data:', data);
    console.log('Images:', images);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Progress indicator */}
      <div className="border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Create New Material Listing</h1>
            <div className="flex space-x-2">
              <Button variant="outline" type="button">Save Draft</Button>
              <Button type="button">Publish</Button>
            </div>
          </div>
          <div className="flex">
            {['Basic Info', 'Specifications', 'Pricing', 'Images & Docs'].map((label, index) => (
              <div
                key={label}
                className={`flex-1 ${index < 3 ? 'border-r border-gray-200' : ''} px-4`}
              >
                <div className="relative">
                  <div
                    className={`h-2 rounded-full ${
                      step > index + 1 ? 'bg-green-500' :
                      step === index + 1 ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  ></div>
                  <div className="mt-2 text-sm text-center">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  {...register('category', { required: true })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="cement">Cement</option>
                  <option value="steel">Steel</option>
                  <option value="blocks">Blocks</option>
                  <option value="aggregates">Aggregates</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">Category is required</p>
                )}
              </div>

              <Input
                label="Material Name"
                {...register('name', { required: true })}
                error={errors.name?.message}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Input
                label="Brand"
                {...register('brand', { required: true })}
                error={errors.brand?.message}
              />

              <Input
                label="Model/SKU"
                {...register('model')}
                error={errors.model?.message}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Input
                label="Manufacturing Date"
                type="date"
                {...register('manufacturingDate')}
                error={errors.manufacturingDate?.message}
              />

              <Input
                label="Country of Origin"
                {...register('origin', { required: true })}
                error={errors.origin?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Condition
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['new', 'used', 'surplus'].map((condition) => (
                  <label
                    key={condition}
                    className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      {...register('condition')}
                      value={condition}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 capitalize">{condition}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-400 mr-2" />
                <p className="text-sm text-blue-700">
                  Add specifications that are relevant to your material. Be as detailed as possible to help buyers make informed decisions.
                </p>
              </div>
            </div>

            {specifications.map((spec, index) => (
              <div key={index} className="flex space-x-4">
                <Input
                  label={index === 0 ? "Specification" : ""}
                  placeholder="e.g., Strength"
                  value={spec.key}
                  onChange={(e) => {
                    const newSpecs = [...specifications];
                    newSpecs[index].key = e.target.value;
                    setSpecifications(newSpecs);
                  }}
                />
                <Input
                  label={index === 0 ? "Value" : ""}
                  placeholder="e.g., 42.5 MPa"
                  value={spec.value}
                  onChange={(e) => {
                    const newSpecs = [...specifications];
                    newSpecs[index].value = e.target.value;
                    setSpecifications(newSpecs);
                  }}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeSpecification(index)}
                    className="mt-7 p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addSpecification}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Specification
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Input
                label="Unit Price (ETB)"
                type="number"
                {...register('price', { required: true, min: 0 })}
                error={errors.price?.message}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Type
                </label>
                <select
                  {...register('unit', { required: true })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select unit</option>
                  <option value="kg">Kilogram (kg)</option>
                  <option value="ton">Ton</option>
                  <option value="m3">Cubic Meter (m³)</option>
                  <option value="piece">Piece</option>
                </select>
                {errors.unit && (
                  <p className="mt-1 text-sm text-red-600">Unit is required</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Input
                label="Available Quantity"
                type="number"
                {...register('quantity', { required: true, min: 0 })}
                error={errors.quantity?.message}
              />

              <Input
                label="Minimum Order Quantity"
                type="number"
                {...register('minOrder', { required: true, min: 0 })}
                error={errors.minOrder?.message}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Input
                label="Warehouse Location"
                {...register('location', { required: true })}
                error={errors.location?.message}
              />

              <Input
                label="Delivery Radius (km)"
                type="number"
                {...register('deliveryRadius', { required: true, min: 0 })}
                error={errors.deliveryRadius?.message}
              />
            </div>

            <Input
              label="Preparation Time (days)"
              type="number"
              {...register('preparationTime', { required: true, min: 0 })}
              error={errors.preparationTime?.message}
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material Images
              </label>
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500"
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Drag & drop images here, or click to select files
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Up to 5 images (JPG, PNG) • Max 5MB each
                </p>
              </div>

              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-5 gap-4">
                  {images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-100 rounded-full p-1 text-red-600 hover:bg-red-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technical Documentation
              </label>
              <div className="space-y-4">
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  label="Technical Specifications Document"
                />
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  label="Quality Certificates"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
            >
              Previous
            </Button>
          )}
          
          {step < 4 ? (
            <Button
              type="button"
              onClick={() => setStep(step + 1)}
              className="ml-auto"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              className="ml-auto"
            >
              Create Listing
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MaterialListingForm;