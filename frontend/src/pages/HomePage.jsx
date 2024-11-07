import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedAuctions from '../components/FeaturedAuctions';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100"
    >
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Hero />
        <FeaturedAuctions />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </motion.div>
  );
}
