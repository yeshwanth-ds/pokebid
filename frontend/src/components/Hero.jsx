import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-900 leading-tight">
            Catch the Rarest <span className="text-purple-600">Pokémon Cards</span> in Epic Auctions!
          </h1>
          <p className="text-xl mb-8 text-indigo-700">
            Join the ultimate Pokémon card marketplace. Bid, sell, and expand your collection with PokieBid!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
          >
            Start Your Adventure
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-2xl transform rotate-3"></div>
          <img
            src="/placeholder.svg"
            alt="Rare Pokémon Cards"
            width={600}
            height={400}
            className="rounded-2xl shadow-2xl relative z-10"
          />
        </motion.div>
      </div>
    </section>
  );
}
