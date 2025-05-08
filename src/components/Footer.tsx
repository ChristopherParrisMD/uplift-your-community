
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block">
              <span className="text-xl font-display font-bold bg-gradient-to-r from-mindful-600 to-calm-600 inline-block text-transparent bg-clip-text">My Insight Ally</span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              Empowering mental wellness through community connection, professional support, and evidence-based resources.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-3">
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/crisis">Crisis Support</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-3">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/privacy">Privacy</FooterLink>
              <FooterLink to="/terms">Terms</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 py-8">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} My Insight Ally. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 text-center mt-2">
            If you're experiencing a crisis, please call the 988 Suicide & Crisis Lifeline at 988, or text HOME to 741741.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link to={to} className="text-gray-600 hover:text-mindful-600 transition-colors">
      {children}
    </Link>
  </li>
);

export default Footer;
