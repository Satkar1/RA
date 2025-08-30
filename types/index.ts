export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
}

export interface Agency {
  id: number;
  name: string;
  type: 'medical' | 'natural' | 'commercial';
  address: string;
  phone: string;
  description: string;
  latitude: number;
  longitude: number;
  created_at: string;
}

export interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
}