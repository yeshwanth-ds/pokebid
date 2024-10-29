import express from 'express';
import {
    signup,
    login,
    logout,
    getUserById,
    updateProfile,
    deleteUser,
    getVerifyEmail
} from '../controllers/user.controllers.js';
import protectRoute from '../middleware/protectRoute.js'; 

const router = express.Router();

// Public routes
router.post('/signup', signup);         
router.post('/login', login);           
router.post('/logout', logout);          
router.get('/verify-email', getVerifyEmail); 

// Protected routes
router.get('/profile', protectRoute, getUserById);       
router.put('/updateProfile', protectRoute, updateProfile); 
router.delete('/deleteUser', protectRoute, deleteUser);  

export default router;  
