'use client'

import { motion } from 'framer-motion'
import { Search, DollarSign, Package } from 'lucide-react'

const steps = [
  { icon: Search, title: 'Discover', description: 'Explore our vast collection of rare and valuable Pokémon cards.' },
  { icon: DollarSign, title: 'Bid', description: 'Place strategic bids on the cards you want to add to your collection.' },
  { icon: Package, title: 'Collect', description: 'Win auctions and receive your cards securely packaged and authenticated.' },
]

export default function HowItWorks() {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl my-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-indigo-900">How PokieBid Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="bg-gradient-to-r from-indigo-400 to-purple-400 p-4 rounded-full mb-6">
                <step.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-indigo-900">{step.title}</h3>
              <p className="text-indigo-700">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}