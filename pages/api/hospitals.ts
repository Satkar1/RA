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
    // In a real application, you would fetch from your database
    const hospitals = [
      {
        id: 1,
        name: "City General Hospital",
        address: "123 Medical Drive, Cityville",
        phone: "(555) 123-4567",
        latitude: 40.7128,
        longitude: -74.0060,
      },
      {
        id: 2,
        name: "Community Health Center",
        address: "456 Wellness Avenue, Townsville",
        phone: "(555) 987-6543",
        latitude: 40.7215,
        longitude: -74.0123,
      },
      {
        id: 3,
        name: "Emergency Care Facility",
        address: "789 urgent Care Lane, Villageton",
        phone: "(555) 456-7890",
        latitude: 40.7056,
        longitude: -74.0083,
      },
    ];

    res.status(200).json(hospitals);
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}