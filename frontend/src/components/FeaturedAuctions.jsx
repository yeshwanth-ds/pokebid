import { motion } from 'framer-motion';
import disp1 from '../assets/disp1.png';
import disp2 from '../assets/disp2.png';
import disp3 from '../assets/disp3.png';

const featuredAuctions = [
  { id: 1, name: 'Charizard Holo 1st Edition', currentBid: 15000, image: disp1 },
  { id: 2, name: 'Pikachu Illustrator', currentBid: 75000, image: disp2 },
  { id: 3, name: 'Shining Mewtwo', currentBid: 5000, image: disp3 },
];

export default function FeaturedAuctions() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold mb-12 text-center text-indigo-900">Featured Auctions</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {featuredAuctions.map((auction, index) => (
          <motion.div
            key={auction.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-200"
          >
            <div className="relative w-full h-48">
              <img
                src={auction.image}
                alt={auction.name}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 rounded-bl-lg font-semibold">
                Hot Deal
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-indigo-900">{auction.name}</h3>
              <p className="text-purple-700 font-bold">Current Bid: ${auction.currentBid.toLocaleString()}</p>
              <button className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md w-full">
                Place Bid
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
