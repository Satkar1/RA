import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';
import { User } from '../../types';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle different HTTP methods
  switch (req.method) {
    case 'POST':
      return handleAuthRequest(req, res);
    case 'GET':
      return handleGetUser(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}

async function handleAuthRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { action, username, email, password } = req.body;

    if (!action) {
      return res.status(400).json({ message: 'Action is required' });
    }

    if (action === 'login') {
      // Login logic
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      return res.status(200).json({
        message: 'Login successful',
        token: 'demo-auth-token',
        user: { id: user.id, username: user.username, email: user.email }
      });

    } else if (action === 'signup') {
      // Signup logic
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email and password are required' });
      }

      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .or(`username.eq.${username},email.eq.${email}`)
        .single();

      if (existingUser) {
        return res.status(409).json({ 
          message: 'User with this username or email already exists' 
        });
      }

      // Create new user
      const { data: newUser, error } = await supabase
        .from('users')
        .insert([{ username, email, password }])
        .single();

      if (error) {
        throw error;
      }

      return res.status(201).json({
        message: 'User created successfully',
        user: { id: newUser.id, username: newUser.username, email: newUser.email }
      });

    } else if (action === 'logout') {
      // Logout logic - in a real app, you'd invalidate the token
      return res.status(200).json({ message: 'Logout successful' });

    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function handleGetUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract token from headers
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    // In a real app, you would verify the JWT token here
    // For demo purposes, we'll just return a mock user
    if (token === 'demo-auth-token') {
      return res.status(200).json({
        user: {
          id: 1,
          username: 'demo_user',
          email: 'demo@example.com'
        }
      });
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }

  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }

}

