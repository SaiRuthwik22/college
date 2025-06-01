import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E40AF] text-white border-t border-border/40">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="flex flex-col">
            <div className="text-xl font-display font-semibold mb-4">EduPortal</div>
            <p className="mb-6 text-white/80">
              Your trusted platform for discovering top educational opportunities and resources worldwide.
            </p>
            <div className="flex space-x-4 mt-2">
              <a href="https://facebook.com" className="hover:text-accent transition-colors text-white" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-accent transition-colors text-white" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="hover:text-accent transition-colors text-white" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" className="hover:text-accent transition-colors text-white" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/colleges" className="text-white hover:text-accent transition-colors">
                  Colleges
                </Link>
              </li>
              <li>
                <Link to="/internships" className="text-white hover:text-accent transition-colors">
                  Internships
                </Link>
              </li>
              <li>
                <Link to="/open-degree" className="text-white hover:text-accent transition-colors">
                  Open Degree
                </Link>
              </li>
              <li>
                <Link to="/international" className="text-white hover:text-accent transition-colors">
                  International Programs
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white hover:text-accent transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refer" className="text-white hover:text-accent transition-colors">
                  Refer & Earn
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 flex-shrink-0 text-white" />
                <span className="text-white/80">123 Education Street, Learning City, ED 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0 text-white" />
                <a href="tel:+1234567890" className="text-white hover:text-accent transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0 text-white" />
                <a href="mailto:info@eduportal.com" className="text-white hover:text-accent transition-colors">
                  info@eduportal.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-10 pt-6 text-center text-sm text-white/80">
          <p>© {new Date().getFullYear()} EduPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
