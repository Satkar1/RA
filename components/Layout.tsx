import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>{children}</main>
      <footer className="bg-blue-900 text-white py-6 text-center">
        <p>&copy; 2024 Rescue Agency Locator</p>
      </footer>
    </div>
  );
}