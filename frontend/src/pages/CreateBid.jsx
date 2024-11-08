import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const CreateBid = () => {
  const [formData, setFormData] = useState({
    bidName: "",
    bidImage: "",
    initialBid: 0,
    maximumBid: 0,
    minBidAmount: 1,
    expireDays: 0, // Changed to expireDays for number of days input
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/createBid",
        formData, // Pass formData directly without calculating expireTime
        { withCredentials: true }
      );
      setSuccess(response.data.message);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      setSuccess(null);
    }
  };

  return (
    <section className="py-16 px-8 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8 md:p-12"
      >
        <h2 className="text-2xl font-bold text-indigo-900 mb-6">Create a New Bid</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-indigo-900 font-semibold mb-2">Bid Name</label>
            <input
              type="text"
              name="bidName"
              value={formData.bidName}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-indigo-900 font-semibold mb-2">Bid Image URL</label>
            <input
              type="text"
              name="bidImage"
              value={formData.bidImage}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-indigo-900 font-semibold mb-2">Initial Bid</label>
            <input
              type="number"
              name="initialBid"
              value={formData.initialBid}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
              min="0"
            />
          </div>
          <div className="mb-4">
            <label className="block text-indigo-900 font-semibold mb-2">Maximum Bid</label>
            <input
              type="number"
              name="maximumBid"
              value={formData.maximumBid}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
              min="0"
            />
          </div>
          <div className="mb-4">
            <label className="block text-indigo-900 font-semibold mb-2">Minimum Bid Amount</label>
            <input
              type="number"
              name="minBidAmount"
              value={formData.minBidAmount}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
              min="1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-indigo-900 font-semibold mb-2">Expiration Time (in days)</label>
            <input
              type="number"
              name="expireDays"
              value={formData.expireDays}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
              min="1"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg"
          >
            Create Bid
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default CreateBid;
