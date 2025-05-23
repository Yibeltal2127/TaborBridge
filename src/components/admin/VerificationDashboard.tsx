import React, { useState } from 'react';
import { useTable, useSortBy, useFilters } from '@tanstack/react-table';
import { Search, AlertCircle, CheckCircle, XCircle, Clock, Filter } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface VerificationRequest {
  id: string;
  businessName: string;
  type: 'individual' | 'business';
  submissionDate: string;
  priority: 'standard' | 'urgent';
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  assignedTo?: string;
  documents: {
    type: string;
    url: string;
    status: 'pending' | 'approved' | 'rejected';
  }[];
}

const VerificationDashboard: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [currentDocument, setCurrentDocument] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - would come from API
  const verificationRequests: VerificationRequest[] = [
    {
      id: 'VR-001',
      businessName: 'Abebe Construction',
      type: 'business',
      submissionDate: '2024-03-15T10:30:00',
      priority: 'urgent',
      status: 'pending',
      documents: [
        {
          type: 'Business License',
          url: '/documents/license.pdf',
          status: 'pending'
        },
        {
          type: 'Tax Registration',
          url: '/documents/tax.pdf',
          status: 'pending'
        }
      ]
    },
    // Add more mock data as needed
  ];

  const columns = React.useMemo(
    () => [
      {
        Header: 'Request ID',
        accessor: 'id',
      },
      {
        Header: 'Business Name',
        accessor: 'businessName',
      },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: ({ value }: { value: string }) => (
          <span className="capitalize">{value}</span>
        ),
      },
      {
        Header: 'Submission Date',
        accessor: 'submissionDate',
        Cell: ({ value }: { value: string }) => (
          new Date(value).toLocaleDateString()
        ),
      },
      {
        Header: 'Priority',
        accessor: 'priority',
        Cell: ({ value }: { value: string }) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {value.toUpperCase()}
          </span>
        ),
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }: { value: string }) => {
          const statusConfig = {
            pending: { icon: Clock, className: 'text-yellow-500' },
            in_review: { icon: AlertCircle, className: 'text-blue-500' },
            approved: { icon: CheckCircle, className: 'text-green-500' },
            rejected: { icon: XCircle, className: 'text-red-500' },
          };
          
          const StatusIcon = statusConfig[value as keyof typeof statusConfig].icon;
          const className = statusConfig[value as keyof typeof statusConfig].className;
          
          return (
            <div className="flex items-center">
              <StatusIcon className={`h-4 w-4 ${className} mr-1`} />
              <span className="capitalize">{value.replace('_', ' ')}</span>
            </div>
          );
        },
      },
      {
        Header: 'Actions',
        Cell: ({ row }: any) => (
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={() => setSelectedRequest(row.original)}
            >
              Review
            </Button>
          </div>
        ),
      },
    ],
    []
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
      data: verificationRequests,
    },
    useFilters,
    useSortBy
  );

  const handleVerificationAction = async (action: 'approve' | 'reject', reason?: string) => {
    if (!selectedRequest) return;

    try {
      // API call would go here
      console.log(`${action}ing verification request`, {
        requestId: selectedRequest.id,
        reason,
      });

      // Update UI
      setSelectedRequest(null);
    } catch (error) {
      console.error('Error processing verification action:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Verification Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and process verification requests for businesses and individuals
            </p>
          </div>

          {/* Filters and search */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Input
                label=""
                type="search"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="h-5 w-5 text-gray-400" />}
                className="w-64"
              />
              
              <div className="flex items-center space-x-2">
                <Input
                  label=""
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-40"
                />
                <span className="text-gray-500">to</span>
                <Input
                  label=""
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-40"
                />
              </div>
            </div>

            <Button
              variant="outline"
              className="flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Verification requests table */}
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {column.render('Header')}
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
        </div>
      </div>

      {/* Document viewer sidebar */}
      {selectedRequest && (
        <div className="w-1/3 border-l border-gray-200 bg-white overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                Review Verification
              </h2>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900">Business Details</h3>
              <dl className="mt-2 divide-y divide-gray-200">
                <div className="py-3 flex justify-between">
                  <dt className="text-sm text-gray-500">Business Name</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {selectedRequest.businessName}
                  </dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm text-gray-500">Request ID</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {selectedRequest.id}
                  </dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm text-gray-500">Submission Date</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {new Date(selectedRequest.submissionDate).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Documents</h3>
              <div className="space-y-4">
                {selectedRequest.documents.map((doc) => (
                  <div
                    key={doc.type}
                    className={`p-4 rounded-lg border ${
                      currentDocument === doc.url
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {doc.type}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentDocument(doc.url)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {currentDocument && (
              <div className="mb-6">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg">
                  {/* Document preview would go here */}
                  <div className="flex items-center justify-center">
                    <span className="text-gray-500">Document Preview</span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <Button
                variant="outline"
                fullWidth
                onClick={() => handleVerificationAction('reject')}
              >
                Reject
              </Button>
              <Button
                fullWidth
                onClick={() => handleVerificationAction('approve')}
              >
                Approve
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationDashboard;