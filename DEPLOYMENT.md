# Deployment Guide for Vercel

## Prerequisites
- Vercel account
- Supabase account

## Steps

1. **Set up Supabase Database**
   - Create a new project in Supabase
   - Create tables for agencies, users, etc.
   - Note your project URL and anon key

2. **Prepare Your Application**
   - Ensure all environment variables are set in Vercel
   - Test the application locally

3. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Configure environment variables in Vercel dashboard:
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - Deploy the application

4. **Post-Deployment**
   - Test all functionality in the production environment
   - Set up custom domain if needed