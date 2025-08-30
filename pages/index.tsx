import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';

// Dynamically import the map component to avoid SSR issues
const Map = dynamic(() => import('../components/Map'), { 
  ssr: false 
});

export default function Home() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to a central location if geolocation fails
          setUserLocation([0, 0]);
        }
      );
    }
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
          Rescue Agency Locator
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Unified Rescue Agency System
          </h2>
          <p className="text-gray-700 mb-4">
            Our system provides a centralized database for agency registration and a real-time map 
            display of rescue agency locations. Accessible to authorized personnel, it delivers 
            critical information during disaster response.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 h-96">
          <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center">
            Nearby Rescue Agencies
          </h3>
          {userLocation ? (
            <Map center={userLocation} zoom={13} />
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-600">Loading map...</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}