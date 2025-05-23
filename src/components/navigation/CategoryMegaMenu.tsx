import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  subcategories: {
    id: string;
    name: string;
    popularTags: string[];
  }[];
}

interface CategoryMegaMenuProps {
  mobile?: boolean;
}

const CategoryMegaMenu: React.FC<CategoryMegaMenuProps> = ({ mobile = false }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Mock categories - would come from API
  const categories: Category[] = [
    {
      id: 'cement',
      name: 'Cement & Concrete',
      icon: '🏗️',
      subcategories: [
        {
          id: 'portland',
          name: 'Portland Cement',
          popularTags: ['OPC', 'PPC', 'White Cement']
        },
        {
          id: 'ready-mix',
          name: 'Ready Mix Concrete',
          popularTags: ['M20', 'M25', 'M30']
        }
      ]
    },
    {
      id: 'steel',
      name: 'Steel',
      icon: '🔩',
      subcategories: [
        {
          id: 'rebars',
          name: 'Rebars',
          popularTags: ['Fe500', 'Fe550', 'Fe600']
        },
        {
          id: 'steel-sheets',
          name: 'Steel Sheets',
          popularTags: ['Galvanized', 'Cold Rolled', 'Hot Rolled']
        }
      ]
    },
  
    // Add more categories
  ];

  if (mobile) {
    return (
      <div className="space-y-2">
        <button
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Categories</span>
          <ChevronDown className={`h-5 w-5 transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="space-y-1">
            {categories.map((category) => (
              <div key={category.id}>
                <button
                  className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                  onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{category.icon}</span>
                    <span>{category.name}</span>
                  </div>
                  <ChevronRight className={`h-5 w-5 transform ${activeCategory === category.id ? 'rotate-90' : ''}`} />
                </button>

                {activeCategory === category.id && (
                  <div className="pl-8 space-y-1">
                    {category.subcategories.map((sub) => (
                      <a
                        key={sub.id}
                        href={`/category/${category.id}/${sub.id}`}
                        className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-50"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <span>Categories</span>
        <ChevronDown className="h-5 w-5" />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 w-screen max-w-7xl bg-white shadow-lg rounded-b-lg"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="grid grid-cols-4 p-6 gap-6">
            <div className="col-span-1 border-r border-gray-200">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`flex items-center w-full px-4 py-3 text-sm ${
                    activeCategory === category.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onMouseEnter={() => setActiveCategory(category.id)}
                >
                  <span className="mr-3">{category.icon}</span>
                  <span>{category.name}</span>
                  <ChevronRight className="ml-auto h-5 w-5" />
                </button>
              ))}
            </div>

            {activeCategory && (
              <div className="col-span-3 p-4">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {categories.find(c => c.id === activeCategory)?.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {categories
                        .find(c => c.id === activeCategory)
                        ?.subcategories.map((sub) => (
                          <div key={sub.id}>
                            <a
                              href={`/category/${activeCategory}/${sub.id}`}
                              className="text-sm font-medium text-gray-900 hover:text-blue-600"
                            >
                              {sub.name}
                            </a>
                            <div className="mt-2 space-x-2">
                              {sub.popularTags.map((tag) => (
                                <a
                                  key={tag}
                                  href={`/search?tag=${tag}`}
                                  className="inline-block px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200"
                                >
                                  {tag}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    {/* Featured Section */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Featured
                      </h4>
                      {/* Add featured content */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryMegaMenu;