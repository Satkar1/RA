import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export default function Medical() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
          setUserLocation([0, 0]); // Default location
        }
      );
    }

    // Fetch hospitals
    const fetchHospitals = async () => {
      try {
        const response = await fetch('/api/hospitals');
        const data = await response.json();
        setHospitals(data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">Medical Emergency Services</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Nearby Hospitals</h2>
          
          <div className="h-96 mb-6">
            {userLocation ? (
              <Map center={userLocation} zoom={13} />
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-600">Loading map...</p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.map((hospital) => (
              <div key={hospital.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-900 mb-2">{hospital.name}</h3>
                <p className="text-gray-700 mb-3">{hospital.address}</p>
                <p className="text-blue-600 font-medium">{hospital.phone}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-blue-100 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Emergency Instructions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">For Serious Injuries</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Call emergency services immediately (911)</li>
                <li>Do not move the injured person unless necessary</li>
                <li>Apply pressure to stop bleeding</li>
                <li>Keep the person warm and comfortable</li>
                <li>Stay with the person until help arrives</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">For Medical Advice</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Contact your primary care physician</li>
                <li>Use telehealth services if available</li>
                <li>Visit urgent care for non-life-threatening issues</li>
                <li>Call poison control if needed: 1-800-222-1222</li>
                <li>Check with your insurance for covered facilities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}