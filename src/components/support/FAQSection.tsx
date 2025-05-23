import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown } from 'lucide-react';
import Input from '../ui/Input';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful?: number;
  notHelpful?: number;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  categories: string[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs, categories }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);
  const [helpfulFAQs, setHelpfulFAQs] = useState<Record<string, boolean>>({});

  const toggleFAQ = (id: string) => {
    setExpandedFAQs(prev =>
      prev.includes(id) ? prev.filter(faqId => faqId !== id) : [...prev, id]
    );
  };

  const markHelpful = (id: string, isHelpful: boolean) => {
    setHelpfulFAQs(prev => ({
      ...prev,
      [id]: isHelpful,
    }));
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search and filters */}
      <div className="mb-8">
        <Input
          label=""
          type="search"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="h-5 w-5 text-gray-400" />}
          className="mb-4"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === 'all'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ list */}
      <div className="space-y-4">
        {filteredFAQs.map(faq => (
          <div
            key={faq.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              {expandedFAQs.includes(faq.id) ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>

            {expandedFAQs.includes(faq.id) && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="prose max-w-none text-gray-600">
                  {faq.answer}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => markHelpful(faq.id, true)}
                      className={`flex items-center space-x-1 text-sm ${
                        helpfulFAQs[faq.id] === true
                          ? 'text-green-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>Helpful</span>
                    </button>
                    <button
                      onClick={() => markHelpful(faq.id, false)}
                      className={`flex items-center space-x-1 text-sm ${
                        helpfulFAQs[faq.id] === false
                          ? 'text-red-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span>Not helpful</span>
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {faq.helpful} found this helpful
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No FAQs found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default FAQSection;