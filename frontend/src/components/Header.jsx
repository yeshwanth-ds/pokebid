import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';  // Use react-router-dom Link
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white bg-opacity-90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
          PokieBid
        </Link>
        <nav className="hidden md:flex space-x-6">
          <NavLink to="/auctions">Auctions</NavLink>
          <NavLink to="/sell">Sell</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white py-4"
        >
          <nav className="flex flex-col items-center space-y-4">
            <NavLink to="/auctions">Auctions</NavLink>
            <NavLink to="/sell">Sell</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </motion.div>
      )}
    </header>
  );
}

function NavLink({ to, children }) {
  return (
    <Link to={to} className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200">
      {children}
    </Link>
  );
}
