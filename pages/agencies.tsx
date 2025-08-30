import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import AgencyCard from '../components/AgencyCard';
import { Agency } from '../types';

export default function Agencies() {
  const [agencies, setAgencies] = useState<Agency[]>([]);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await fetch('/api/agencies');
        const data = await response.json();
        setAgencies(data);
      } catch (error) {
        console.error('Error fetching agencies:', error);
      }
    };

    fetchAgencies();
  }, []);

  const agencyTypes = [
    {
      type: 'medical',
      title: 'Medical Emergency',
      description: 'Accidents, health crises, and medical emergencies',
      link: '/medical',
    },
    {
      type: 'natural',
      title: 'Natural Emergency',
      description: 'Floods, earthquakes, and natural disasters',
      link: '#',
    },
    {
      type: 'commercial',
      title: 'Commercial Emergency',
      description: 'Fires, industrial accidents, and commercial emergencies',
      link: '#',
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">Rescue Agencies</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {agencyTypes.map((agencyType) => (
            <div key={agencyType.type} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-3">{agencyType.title}</h2>
              <p className="text-gray-700 mb-4">{agencyType.description}</p>
              <Link
                href={agencyType.link}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">All Registered Agencies</h2>
          
          {agencies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agencies.map((agency) => (
                <AgencyCard key={agency.id} agency={agency} showDetails={true} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No agencies registered yet.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}