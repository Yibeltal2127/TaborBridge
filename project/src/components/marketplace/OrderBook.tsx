import React, { useState } from 'react';
import { useTable, useSortBy } from '@tanstack/react-table';
import { ChevronUp, ChevronDown, Filter, Star, Shield } from 'lucide-react';
import Button from '../ui/Button';

interface Order {
  id: string;
  price: number;
  quantity: number;
  seller: {
    name: string;
    verified: boolean;
    rating: number;
  };
  paymentMethods: string[];
  delivery: string;
  minOrder: number;
}

interface OrderBookProps {
  materialName: string;
  category: string;
  averagePrice: number;
  orders: Order[];
}

const OrderBook: React.FC<OrderBookProps> = ({
  materialName,
  category,
  averagePrice,
  orders,
}) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [filters, setFilters] = useState({
    location: '',
    minRating: 0,
    verifiedOnly: false,
  });

  const columns = React.useMemo(
    () => [
      {
        Header: 'Price (ETB)',
        accessor: 'price',
        Cell: ({ value }: { value: number }) => (
          <div className={`font-medium ${
            value < averagePrice ? 'text-green-600' : 'text-red-600'
          }`}>
            {value.toLocaleString()}
          </div>
        ),
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
        Cell: ({ value }: { value: number }) => (
          <span>{value.toLocaleString()}</span>
        ),
      },
      {
        Header: 'Seller',
        accessor: 'seller',
        Cell: ({ value }: { value: any }) => (
          <div className="flex items-center">
            <span className="font-medium">{value.name}</span>
            {value.verified && (
              <Shield className="h-4 w-4 text-green-500 ml-1" />
            )}
            <div className="flex items-center ml-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="ml-1 text-sm">{value.rating}</span>
            </div>
          </div>
        ),
      },
      {
        Header: 'Payment',
        accessor: 'paymentMethods',
        Cell: ({ value }: { value: string[] }) => (
          <div className="flex flex-wrap gap-1">
            {value.map((method) => (
              <span
                key={method}
                className="px-2 py-1 text-xs bg-gray-100 rounded-full"
              >
                {method}
              </span>
            ))}
          </div>
        ),
      },
      {
        Header: 'Delivery',
        accessor: 'delivery',
      },
      {
        Header: 'Min. Order',
        accessor: 'minOrder',
        Cell: ({ value }: { value: number }) => (
          <span>{value.toLocaleString()}</span>
        ),
      },
      {
        Header: '',
        id: 'actions',
        Cell: () => (
          <Button size="sm">
            {activeTab === 'buy' ? 'Buy' : 'Sell'}
          </Button>
        ),
      },
    ],
    [activeTab, averagePrice]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: orders,
    },
    useSortBy
  );

  return (
    <div className="bg-white shadow-sm rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{materialName}</h1>
            <p className="text-sm text-gray-500">{category}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Average Price</div>
            <div className="text-xl font-bold text-gray-900">
              ETB {averagePrice.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'buy'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('buy')}
            >
              Buy Orders
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'sell'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('sell')}
            >
              Sell Orders
            </button>
          </div>

          <button
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            onClick={() => {/* Toggle filters */}}
          >
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="w-full">
          <thead className="bg-gray-50">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      {column.render('Header')}
                      {column.isSorted && (
                        column.isSortedDesc
                          ? <ChevronDown className="h-4 w-4 ml-1" />
                          : <ChevronUp className="h-4 w-4 ml-1" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderBook;