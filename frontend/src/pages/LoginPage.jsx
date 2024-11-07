import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom' // For redirection
import Header from '../components/Header'
import { useAuthStore } from '../store/authStore'  // Import the authStore to use the login function
import img from '../assets/loginimg.png';

export default function LoginPage() {
  const { login, isLoading, error } = useAuthStore()  // Destructure login, isLoading, and error
  const [username, setUsername] = useState('')  // Use username instead of email
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()  // Hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Call the login function with username and password
      await login(username, password)  // Pass username instead of email
      
      // Redirect to home or dashboard after successful login
      navigate('/auction')  // Replace '/dashboard' with the correct route you want
    } catch (err) {
      console.error("Login failed:", err)
      // Handle any error that occurs during login and update UI accordingly
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src={img}
                alt="Pokémon card background"
                width={192}
                height={384}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Welcome back</div>
              <h1 className="block mt-1 text-lg leading-tight font-medium text-black">Login to Your Account</h1>
              <form onSubmit={handleSubmit} className="mt-6">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
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
                      type={showPassword ? 'text' : 'password'}  // Show password if showPassword is true
                      placeholder="******************"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      onClick={() => setShowPassword(!showPassword)}  // Toggle password visibility
                    >
                      {showPassword ? <EyeOff className="h-6 w-6 text-gray-700" /> : <Eye className="h-6 w-6 text-gray-700" />}
                    </button>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isLoading}  // Disable the button while loading
                >
                  {isLoading ? 'Logging in...' : 'Sign In'}
                </motion.button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}  
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
      
    </div>
  )
}
