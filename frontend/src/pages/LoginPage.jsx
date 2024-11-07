import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src="/placeholder.svg"
                alt="Pokémon card background"
                width={192}
                height={384}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Welcome back</div>
              <h1 className="block mt-1 text-lg leading-tight font-medium text-black">Login to Your Account</h1>
              <form className="mt-6">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="ash@pokemon.com"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      <Eye className="h-6 w-6 text-gray-700" />
                    </button>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign In
                </motion.button>
              </form>
              <div className="mt-6 text-center">
                <a href="/forgot-password" className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800">
                  Forgot Password?
                </a>
              </div>
              <div className="mt-4 text-center">
                <span className="text-gray-600">Don't have an account? </span>
                <a href="/signup" className="font-bold text-indigo-500 hover:text-indigo-800">Sign up</a>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  )
}
