import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // For demo purposes, we'll return sample data
    // In a real application, you would fetch from your Supabase database
    const agencies = [
      {
        id: 1,
        name: "City General Hospital",
        type: "medical",
        address: "123 Medical Drive, Cityville",
        phone: "(555) 123-4567",
        description: "24/7 emergency medical services and trauma center",
        latitude: 40.7128,
        longitude: -74.0060,
        created_at: "2023-01-15T10:30:00Z"
      },
      {
        id: 2,
        name: "Community Health Center",
        type: "medical",
        address: "456 Wellness Avenue, Townsville",
        phone: "(555) 987-6543",
        description: "Primary care and urgent medical services",
        latitude: 40.7215,
        longitude: -74.0123,
        created_at: "2023-02-20T14:45:00Z"
      },
      {
        id: 3,
        name: "Emergency Care Facility",
        type: "medical",
        address: "789 Urgent Care Lane, Villageton",
        phone: "(555) 456-7890",
        description: "Immediate care for non-life-threatening emergencies",
        latitude: 40.7056,
        longitude: -74.0083,
        created_at: "2023-03-10T09:15:00Z"
      },
      {
        id: 4,
        name: "Flood Response Team",
        type: "natural",
        address: "101 Rescue Road, Riverside",
        phone: "(555) 111-2233",
        description: "Specialized water rescue and flood emergency services",
        latitude: 40.7150,
        longitude: -74.0015,
        created_at: "2023-04-05T16:20:00Z"
      },
      {
        id: 5,
        name: "Earthquake Response Unit",
        type: "natural",
        address: "202 Stability Street, Quakeville",
        phone: "(555) 444-5566",
        description: "Search and rescue operations for earthquake disasters",
        latitude: 40.7080,
        longitude: -74.0030,
        created_at: "2023-05-12T11:30:00Z"
      },
      {
        id: 6,
        name: "City Fire Department",
        type: "commercial",
        address: "303 Blaze Boulevard, Firetown",
        phone: "(555) 777-8899",
        description: "Fire suppression and rescue services",
        latitude: 40.7180,
        longitude: -74.0090,
        created_at: "2023-06-18T13:45:00Z"
      }
    ];

    res.status(200).json(agencies);
  } catch (error) {
    console.error('Error fetching agencies:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}