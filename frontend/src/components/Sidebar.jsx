// Sidebar.js
import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, CreditCard, List, PlusCircle } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: PlusCircle, label: 'Create Bid', href: '/create-bid' },
    { icon: List, label: 'My Bids', href: '/my-bids' },
    { icon: CreditCard, label: 'Payment', href: '/payment' },
    { icon: Settings, label: 'Settings', href: '/settings' },
   
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-white shadow-lg rounded-lg p-6 h-fit"
    >
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <a
                href={item.href}
                className="flex items-center space-x-4 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                <item.icon className="w-6 h-6" />
                <span>{item.label}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
