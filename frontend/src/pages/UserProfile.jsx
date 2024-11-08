import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Badge, Button, Card, CardContent, CardHeader } from '../components/uiComponents.jsx';
import { CheckCircle, AlertCircle, Star, Clock, DollarSign, ArrowLeft } from 'lucide-react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', { withCredentials: true });
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Handler for verification (mocked as an example)
  const handleVerify = () => {
    setUser(prevUser => ({ ...prevUser, verified: true }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Back button */}
        <Button onClick={() => navigate('/auction')} className="flex items-center bg-indigo-500 text-white mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Auctions
        </Button>

        <Card className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <motion.img
                src={user.profilePicture}
                alt={user.fullName}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold mb-2">{user.fullName}</h1>
                <p className="text-xl text-indigo-200">@{user.userId}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold">{user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-semibold capitalize">{user.gender}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Verification Status:</span>
                  {user.verified ? (
                    <Badge variant="success" className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified</span>
                    </Badge>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Badge variant="destructive" className="flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>Unverified</span>
                      </Badge>
                      <Button onClick={handleVerify} className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                        Verify Now
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <Star className="w-6 h-6 text-yellow-500 mr-2" />
                  Rare Collections
                </h3>
                <div className="flex space-x-4">
                  {Object.entries(user.rareCollections).map(([name, url], index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img src={url} alt={name} className="w-20 h-20 mx-auto mb-2 rounded-lg shadow-md" />
                      <span className="text-sm font-medium">{name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <Clock className="w-6 h-6 text-indigo-500 mr-2" />
                Recent Bids
              </h3>
              <ul className="space-y-4">
                {user.recentBids?.map((bid, index) => (
                  <motion.li
                    key={index}
                    className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <span className="font-medium">Bid #{bid.bidId}</span>
                    <span className="flex items-center text-green-600">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {bid.amount.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">{new Date(bid.timestamp).toLocaleDateString()}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
             {/* Back button */}
      <Button onClick={() => navigate('/auction')} className="flex items-center bg-indigo-500 text-white mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Auctions
        </Button>
          </CardContent>
        </Card>
      </motion.div>
     

    </div>
  );
};

export default UserProfile;
