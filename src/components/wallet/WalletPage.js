import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import WalletImage from '../../images/wallet/walletMain.png';
import Nav from '../navbar/Nav';
import LogoContainer from '../navbar/LogoContainer';
import Footer from '../footer/Footer';
import './walletPage.css';

const WalletPage = ({ userId }) => {
  const [balance, setBalance] = useState(0);
  const [grams, setGrams] = useState(0);
  const [liveSellPrice, setLiveSellPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBalance();
    fetchGrams();
    fetchLiveSellPrice();
  }, [userId]);

  const fetchBalance = () => {
    const currentUser = JSON.parse(localStorage.getItem('User'));
    if (!currentUser) return;

    axios.get(`http://localhost:8080/api/v1/users/${currentUser.userId}`)
      .then(response => {
        setBalance(response.data.balance);
      })
      .catch(error => {
        console.error('Error fetching balance:', error);
      });
  };

  const fetchGrams = () => {
    const currentUser = JSON.parse(localStorage.getItem('User'));
    if (!currentUser) return;

    axios.get(`http://localhost:8080/api/v1/virtual_gold_holding/users/${currentUser.userId}`)
      .then(response => {
        setGrams(response.data[0].quantity);
      })
      .catch(error => {
        console.error('Error fetching grams:', error);
      });
  };

  const fetchLiveSellPrice = () => {
    axios.get('http://localhost:8080/api/v1/vendor/price')
      .then(response => {
        setLiveSellPrice(response.data);
      })
      .catch(error => {
        console.error('Error fetching live sell price:', error);
      });
  };

  const handleBuyGold = () => {
    navigate('/buy');
  };

  const handleSellGold = () => {
    navigate('/sell');
  };

  const calculateGrams = () => {
    if (parseFloat(liveSellPrice) === 0) return 0;
    return (parseFloat(balance) / parseFloat(liveSellPrice)).toFixed(2);
  };

  return (
    <>
      <LogoContainer />
      <Nav />
      <div className="wallet-container" style={{ alignItems: "center", marginTop: "60px", marginBottom: "80px" }}>
        <div className="wallet-image">
          <img src={WalletImage} alt="Wallet" />
        </div>
        <div className="wallet-info" style={{ alignItems: "center", marginTop: "60px", marginBottom: "80px" }}>
          <h2 style={{ color: "#571613" }}>Wallet Balance</h2>&nbsp;
          <div className="balance-info">
            <p><strong>Amount:</strong> ₹{parseFloat(balance).toFixed(2)}</p>
            <p><strong>Grams:</strong>{calculateGrams()} gms</p>
            <p><strong>Balance:</strong> ₹{parseFloat(balance).toFixed(2)} ({calculateGrams()} gms)</p>
            <p><strong>Live Sell Price:</strong> ₹{parseFloat(liveSellPrice).toFixed(2)}</p>
          </div>
          <div className="actions">
            <button onClick={handleBuyGold} style={{ backgroundColor: "#571613", color: "white", width: "40%" }}>Buy Gold</button>&nbsp;&nbsp;
            <button onClick={handleSellGold} style={{ backgroundColor: "#571613", color: "white", width: "40%" }}>Sell Gold</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WalletPage;
