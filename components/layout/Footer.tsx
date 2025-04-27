import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Jansuvidha</h3>
            <ul className="space-y-2">
              <li>
                <p className="text-gray-600">Serving since 2025</p>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/reports/new" className="text-gray-600 hover:text-gray-900">
                  Report Now
                </Link>
              </li>
              <li>
                <Link href="/reports/status" className="text-gray-600 hover:text-gray-900">
                  Track Status
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support Center</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-gray-900">
                  Help Desk
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Social Media</h3>
            <div className="flex space-x-4">
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Instagram size={20} />
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Twitter size={20} />
              </Link>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Administration</h3>
              <Link 
                href="/admin" 
                className="text-gray-600 hover:text-gray-900 block mb-2"
              >
                Government Portal
              </Link>
              <p className="text-sm text-gray-500">
                (For authorized personnel only)
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;