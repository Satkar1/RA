import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  center: [number, number];
  zoom: number;
}

interface Agency {
  id: number;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  address: string;
  phone: string;
}

export default function Map({ center, zoom }: MapProps) {
  const [agencies, setAgencies] = useState<Agency[]>([]);

  useEffect(() => {
    // Fetch nearby agencies from API
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

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* User location marker */}
      <Marker position={center}>
        <Popup>Your Location</Popup>
      </Marker>
      
      {/* Agency markers */}
      {agencies.map((agency) => (
        <Marker
          key={agency.id}
          position={[agency.latitude, agency.longitude]}
        >
          <Popup>
            <div>
              <h3 className="font-semibold">{agency.name}</h3>
              <p>{agency.type}</p>
              <p>{agency.address}</p>
              <p>Phone: {agency.phone}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}