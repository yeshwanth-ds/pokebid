import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Ash Ketchum',
    role: 'Pokémon Master',
    content: 'PokieBid helped me complete my rare card collection. The bidding process is exciting and fair!',
    avatar: '/placeholder.svg',
  },
  {
    id: 2,
    name: 'Misty Waters',
    role: 'Gym Leader',
    content: 'I\'ve both bought and sold cards on PokieBid. It\'s the go-to platform for serious collectors.',
    avatar: '/placeholder.svg',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-12 text-center text-indigo-900">What Trainers Say</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <div className="flex items-center mb-6">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                width={64}
                height={64}
                className="rounded-full mr-4 border-4 border-indigo-200"
              />
              <div>
                <h3 className="font-semibold text-lg text-indigo-900">{testimonial.name}</h3>
                <p className="text-purple-600">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-indigo-700 italic">&ldquo;{testimonial.content}&rdquo;</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
