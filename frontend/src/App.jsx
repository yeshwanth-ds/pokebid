import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import from react-router-dom
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AuctionPage from './pages/AuctionPage';
import UserProfile from './pages/UserProfile';
import CreateBid from './pages/CreateBid';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/auction' element={<AuctionPage></AuctionPage>}></Route>
        <Route path='/profile' element={<UserProfile></UserProfile>}></Route>
        <Route path='/createbid' element={<CreateBid></CreateBid>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
