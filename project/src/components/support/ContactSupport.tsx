import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Clock, MapPin, AlertCircle } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface ContactSupportProps {
  onSubmit: (data: any) => void;
}

const ContactSupport: React.FC<ContactSupportProps> = ({ onSubmit }) => {
  const [issueType, setIssueType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderId: '',
    message: '',
    preferredContact: 'email',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, issueType });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact options */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Contact Options
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-blue-500 mt-1" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                  <p className="text-sm text-gray-500">+251 91 234 5678</p>
                  <p className="text-xs text-gray-500">Mon-Fri, 9am-5pm EAT</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-5 w-5 text-blue-500 mt-1" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Email</h3>
                  <p className="text-sm text-gray-500">support@taborbridge.com</p>
                  <p className="text-xs text-gray-500">24/7 response</p>
                </div>
              </div>

              <div className="flex items-start">
                <MessageCircle className="h-5 w-5 text-blue-500 mt-1" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Live Chat</h3>
                  <p className="text-sm text-gray-500">Available now</p>
                  <p className="text-xs text-gray-500">Typical response: 5 mins</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-500 mt-1" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Office</h3>
                  <p className="text-sm text-gray-500">
                    Bole Road, Addis Ababa<br />
                    Ethiopia
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Business Hours
            </h2>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Monday - Friday</span>
                <span className="text-gray-900">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Saturday</span>
                <span className="text-gray-900">10:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Sunday</span>
                <span className="text-gray-900">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Type
                </label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select an issue type</option>
                  <option value="order">Order Issue</option>
                  <option value="delivery">Delivery Problem</option>
                  <option value="payment">Payment Question</option>
                  <option value="account">Account Help</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <Input
                  label="Order ID (if applicable)"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Contact Method
                </label>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Email</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="phone"
                      checked={formData.preferredContact === 'phone'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Phone</span>
                  </label>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Response Time
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      We typically respond within 24 hours. For urgent matters,
                      please use our live chat or phone support.
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;