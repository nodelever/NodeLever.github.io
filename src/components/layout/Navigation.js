import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    // { path: '/blog', label: 'Solutions' },
    { path: '/about', label: 'About' },
    { path: '/jobs', label: 'Jobs' },
    { path: '/project', label: 'Projects' },
    { path: '/login', label: 'Sign In' }
    
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/80 backdrop-blur-lg border-b border-purple-500/20' 
        : 'bg-black/40 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold group">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-pink-400 group-hover:to-purple-400 transition-all duration-300">
                Node
              </span>
              <span className="text-white ml-2 group-hover:text-gray-300 transition-colors duration-300">
                lever
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative text-base font-medium transition-all duration-300 hover:scale-105 group ${
                  location.pathname === path
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 ${
                  location.pathname === path 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full'
                }`} />
                {location.pathname === path && (
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-cyan-400/10 rounded-lg -z-10" />
                )}
              </Link>
            ))}
            <Link 
              to="/reg" 
              className="bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-2 rounded-full text-white font-semibold hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transform transition-all duration-300 relative overflow-hidden group flex items-center justify-center"
            >
              <span className="relative z-10">Sign Up</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-purple-500/20 bg-black/95 backdrop-blur-lg">
          <div className="px-6 py-4 space-y-2">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`block px-4 py-3 rounded-lg transition-all duration-300 relative group ${
                  location.pathname === path
                    ? 'text-white bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {label}
                {location.pathname === path && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-r" />
                )}
              </Link>
            ))}
            <div className="pt-4 border-t border-purple-500/20">
              <Link 
                to="/reg" 
                onClick={() => setIsOpen(false)}
                className="w-full flex justify-center bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-3 rounded-lg text-white font-semibold hover:scale-[1.02] transform transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;