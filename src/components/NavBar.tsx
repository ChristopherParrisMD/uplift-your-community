
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-display font-bold bg-gradient-to-r from-mindful-600 to-calm-600 inline-block text-transparent bg-clip-text">My Insight Ally</span>
            </Link>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/finding-help">Finding Help</NavLink>
            <NavLink to="/find-provider">Find Provider</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/resources">Resources</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-mindful-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "md:hidden",
        isOpen ? "block" : "hidden"
      )}>
        <div className="pt-2 pb-3 space-y-1 px-2">
          <MobileNavLink to="/" onClick={toggleMenu}>Home</MobileNavLink>
          <MobileNavLink to="/finding-help" onClick={toggleMenu}>Finding Help</MobileNavLink>
          <MobileNavLink to="/find-provider" onClick={toggleMenu}>Find Provider</MobileNavLink>
          <MobileNavLink to="/blog" onClick={toggleMenu}>Blog</MobileNavLink>
          <MobileNavLink to="/resources" onClick={toggleMenu}>Resources</MobileNavLink>
          <MobileNavLink to="/about" onClick={toggleMenu}>About Us</MobileNavLink>
          <MobileNavLink to="/contact" onClick={toggleMenu}>Contact</MobileNavLink>
        </div>
      </div>
    </nav>
  );
};

// Desktop Navigation Link
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "text-mindful-700 font-semibold"
          : "text-gray-600 hover:text-mindful-600"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
};

// Mobile Navigation Link
const MobileNavLink = ({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "block px-3 py-2 rounded-md text-base font-medium transition-colors",
        isActive
          ? "bg-mindful-50 text-mindful-700 font-semibold"
          : "text-gray-600 hover:bg-gray-50 hover:text-mindful-600"
      )}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavBar;
