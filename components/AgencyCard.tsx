import Link from 'next/link';
import { Agency } from '../types';

interface AgencyCardProps {
  agency: Agency;
  showDetails?: boolean;
}

export default function AgencyCard({ agency, showDetails = true }: AgencyCardProps) {
  const getAgencyTypeColor = (type: string) => {
    switch (type) {
      case 'medical':
        return 'bg-red-100 text-red-800';
      case 'natural':
        return 'bg-green-100 text-green-800';
      case 'commercial':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAgencyTypeLabel = (type: string) => {
    switch (type) {
      case 'medical':
        return 'Medical Emergency';
      case 'natural':
        return 'Natural Disaster';
      case 'commercial':
        return 'Commercial Emergency';
      default:
        return type;
    }
  };

  const getAgencyLink = (type: string) => {
    switch (type) {
      case 'medical':
        return '/medical';
      case 'natural':
        return '#'; // Add actual link when page is created
      case 'commercial':
        return '#'; // Add actual link when page is created
      default:
        return '#';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{agency.name}</h3>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getAgencyTypeColor(agency.type)}`}>
            {getAgencyTypeLabel(agency.type)}
          </span>
        </div>

        {showDetails && (
          <>
            <p className="text-gray-600 mb-4">{agency.description}</p>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {agency.address}
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {agency.phone}
              </div>
            </div>
          </>
        )}

        <div className="flex justify-between items-center">
          <Link
            href={getAgencyLink(agency.type)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            View Details
            <svg className="ml-2 -mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>

          {showDetails && (
            <button
              onClick={() => {
                // Handle emergency call - in a real app, this would trigger a phone call
                window.location.href = `tel:${agency.phone}`;
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              <svg className="mr-2 -ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1A1.5 1.5 0 016 3.5v1A1.5 1.5 0 014.5 6h-1A1.5 1.5 0 012 4.5v-1zM3.5 10a1.5 1.5 0 01-1.5-1.5v-1A1.5 1.5 0 013.5 6h1A1.5 1.5 0 016 7.5v1A1.5 1.5 0 014.5 10h-1zM8 3.5A1.5 1.5 0 019.5 2h1A1.5 1.5 0 0112 3.5v1A1.5 1.5 0 0110.5 6h-1A1.5 1.5 0 018 4.5v-1zM9.5 10a1.5 1.5 0 01-1.5-1.5v-1A1.5 1.5 0 019.5 6h1a1.5 1.5 0 011.5 1.5v1A1.5 1.5 0 0110.5 10h-1zM16 7.5a1.5 1.5 0 00-3 0v7a1.5 1.5 0 003 0v-7z" clipRule="evenodd" />
              </svg>
              Call Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}