import React, { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore.jsx'; // Import the Zustand store
import axios from 'axios';

const AuctionPage = () => {
  const { ongoingBids, bidsLoading, bidsError, fetchOngoingBids } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [bidStatus, setBidStatus] = useState(null); // To show success or error messages

  useEffect(() => {
    // Fetch the ongoing bids when the component mounts
    fetchOngoingBids();
  }, [fetchOngoingBids]);

  const handleBidNow = async (bidId, bidName) => {
    try {
      // Call the placeBid API endpoint
      const response = await axios.post(
        `http://localhost:5000/api/placeBid/${bidId}`,
        {}, // No need to send data; server handles increment based on minBidAmount
        { withCredentials: true } // To send cookies (JWT) with the request
      );

      // Update bid status on success
      setBidStatus({ success: true, message: `Bid placed successfully on ${bidName}` });
      // Optionally, refresh the bid list to show the updated currentBid
      fetchOngoingBids();
    } catch (error) {
      // Handle any error that occurs
      setBidStatus({
        success: false,
        message: error.response?.data?.error || 'Failed to place bid. Please try again.',
      });
    }
  };

  // Filter the ongoing bids based on search query
  const filteredBids = ongoingBids.filter((bid) =>
    bid.bidName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading state
  if (bidsLoading) {
    return <div>Loading ongoing bids...</div>;
  }

  // Error state
  if (bidsError) {
    return <div>Error: {bidsError}</div>;
  }

  // Empty state
  if (filteredBids.length === 0) {
    return <div>No ongoing bids available</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header at the top */}
      <Header />

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar below header */}
        <Sidebar />

        {/* Main content area */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          {/* Search Bar */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by bid name..."
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>

          {/* Show Bid Status */}
          {bidStatus && (
            <div style={{ marginBottom: '20px', color: bidStatus.success ? 'green' : 'red' }}>
              {bidStatus.message}
            </div>
          )}

          {/* Header Section */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#4F46E5',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            Ongoing Auction Bids
          </motion.h1>

          {/* Bids List */}
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {filteredBids.map((bid) => (
              <motion.li
                key={bid._id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'relative',
                  marginBottom: '20px',
                  padding: '20px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '20px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Bid Image at the extreme left */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 to-blue-300 rounded-2xl transform rotate-3"></div>
                  <img
                    src={bid.bidImage}
                    alt={bid.bidName}
                    width={150} // Set the size of the image
                    height={150}
                    style={{
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                </motion.div>

                {/* Bid Info Section */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#333' }}>{bid.bidName}</h3>
                  <p style={{ fontSize: '1rem', color: '#555' }}>Current Bid: ${bid.currentBid}</p>
                  <p style={{ fontSize: '1rem', color: '#555' }}>Expires on: {new Date(bid.expireTime).toLocaleString()}</p>

                  {/* Bid Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      alignSelf: 'flex-end',
                      backgroundColor: '#6C63FF',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50px',
                      padding: '12px 24px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      transition: 'background-color 0.3s ease',
                    }}
                    onClick={() => handleBidNow(bid._id, bid.bidName)}
                  >
                    Bid Now
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default AuctionPage;
