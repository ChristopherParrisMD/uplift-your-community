
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useMobile } from "@/hooks/use-mobile";
import {
  AlertTriangle,
  Menu,
  X,
} from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMobile();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const routes = [
    { path: "/", label: "Home" },
    { path: "/find-provider", label: "Find Provider" },
    { path: "/resources", label: "Resources" },
    { path: "/blog", label: "Blog" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center"
            onClick={closeMenu}
          >
            <span className="text-xl font-display font-bold bg-gradient-to-r from-mindful-600 to-calm-600 inline-block text-transparent bg-clip-text">
              My Insight Ally
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                isActive={isActive(route.path)}
                onClick={closeMenu}
                label={route.label}
              />
            ))}
          </nav>

          {/* Auth Buttons / Mobile Menu Button */}
          <div className="flex items-center">
            {!isMobile && (
              user ? (
                <Button variant="outline" onClick={handleLogout} className="ml-4">
                  Sign Out
                </Button>
              ) : (
                <div className="space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/admin-login")}
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => navigate("/signup")}
                    className="bg-mindful-600 hover:bg-mindful-700"
                  >
                    Sign Up
                  </Button>
                </div>
              )
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="text-gray-700"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full z-50">
          <div className="pt-2 pb-4 space-y-1 px-4">
            {routes.map((route) => (
              <MobileNavLink
                key={route.path}
                to={route.path}
                isActive={isActive(route.path)}
                onClick={closeMenu}
                label={route.label}
              />
            ))}

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-gray-200 mt-4">
              {user ? (
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full justify-center mt-2"
                >
                  Sign Out
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate("/admin-login");
                      closeMenu();
                    }}
                    className="w-full justify-center"
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/signup");
                      closeMenu();
                    }}
                    className="w-full justify-center bg-mindful-600 hover:bg-mindful-700"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Crisis Banner - only on certain pages */}
      {["/", "/resources"].includes(location.pathname) && (
        <div className="bg-amber-50 border-b border-amber-100">
          <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-amber-600 mr-2" />
              <p className="text-sm text-amber-800">
                In crisis? Call the 988 Suicide & Crisis Lifeline at{" "}
                <a
                  href="tel:988"
                  className="font-bold hover:underline"
                  aria-label="Call 988 Suicide and Crisis Lifeline"
                >
                  988
                </a>
                , or text HOME to{" "}
                <a
                  href="sms:741741"
                  className="font-bold hover:underline"
                  aria-label="Text 741741"
                >
                  741741
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  isActive: boolean;
  onClick: () => void;
  label: string;
}

const NavLink = ({ to, isActive, onClick, label }: NavLinkProps) => (
  <Link
    to={to}
    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
      isActive
        ? "text-mindful-600 border-b-2 border-mindful-500"
        : "text-gray-700 hover:text-gray-900 hover:border-b-2 hover:border-gray-300"
    }`}
    onClick={onClick}
  >
    {label}
  </Link>
);

const MobileNavLink = ({ to, isActive, onClick, label }: NavLinkProps) => (
  <Link
    to={to}
    className={`block px-3 py-2 rounded-md text-base font-medium ${
      isActive
        ? "bg-mindful-50 text-mindful-600"
        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
    }`}
    onClick={onClick}
  >
    {label}
  </Link>
);

export default NavBar;
