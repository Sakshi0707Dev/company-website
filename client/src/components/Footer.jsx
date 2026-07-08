import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-white">
                Apex Solutions
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering businesses with cutting-edge technology solutions
              since 2020. We turn ideas into digital reality.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/about" className="block text-sm hover:text-white transition-colors">
                About
              </Link>
              <Link to="/services" className="block text-sm hover:text-white transition-colors">
                Services
              </Link>
              <Link to="/contact" className="block text-sm hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-sm">
              <p>123 Business Avenue</p>
              <p>San Francisco, CA 94105</p>
              <p>info@apexsolutions.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Apex Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
