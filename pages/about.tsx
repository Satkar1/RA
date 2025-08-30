import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">About Us</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            The Unified Rescue Agency Registration and Location Display System provides a centralized 
            database for agency registration and a real-time map display of rescue agency locations.
          </p>
          <p className="text-gray-700 mb-4">
            Our system is accessible to authorized personnel and delivers critical information during 
            disaster response operations, helping to save lives and coordinate emergency efforts more effectively.
          </p>
          <p className="text-gray-700">
            The <strong>Unified Rescue Agency</strong> aims to streamline disaster management by providing 
            a centralized database and real-time display of <strong>rescue agency locations</strong>, 
            ensuring that help arrives where it's needed most, when it's needed most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-100 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">What We Do</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Register and verify rescue agencies</li>
              <li>Provide real-time location tracking</li>
              <li>Coordinate emergency response efforts</li>
              <li>Offer public access to emergency services information</li>
              <li>Support multiple emergency categories</li>
            </ul>
          </div>

          <div className="bg-blue-100 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Our Values</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Transparency in emergency operations</li>
              <li>Efficiency in response coordination</li>
              <li>Reliability of information</li>
              <li>Accessibility for all authorized users</li>
              <li>Innovation in emergency management technology</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}