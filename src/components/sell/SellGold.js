import React, { useEffect, useState } from 'react';
import Nav from '../navbar/Nav';
import LogoContainer from '../navbar/LogoContainer';
import Footer from '../footer/Footer';
import './sellGold.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SellGold() {
    const [sellOption, setSellOption] = useState('rupee');
    const [goldAmount, setGoldAmount] = useState(0);
    const [currentGoldPrice, setCurrentGoldPrice] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [walletBalance, setWalletBalance] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/vendor/price')
            .then(response => {
                setCurrentGoldPrice(response.data);
            })
            .catch(error => {
                console.error('Error fetching current gold price:', error);
            });
        // Fetch wallet balance
        const currentUser = JSON.parse(localStorage.getItem('User'));
        if (currentUser && currentUser.userId) {
        axios.get(`http://localhost:8080/api/v1/users/check_balance/${currentUser.userId}`)
            .then(response => {
                setWalletBalance(response.data);
            })
            .catch(error => {
                console.error('Error fetching wallet balance:', error);
            });
        }
    }, []);

    const handleSellOptionChange = (option) => {
        setSellOption(option);
    };

    const handleGoldAmountChange = (event) => {
        setGoldAmount(event.target.value);
    };
    const updateWalletBalance = (newBalance) => {
        const currentUser = JSON.parse(localStorage.getItem('User'));
        axios.put(`http://localhost:8080/api/v1/users/${currentUser.userId}/update_balance/${newBalance}`)
            .then(response => {
                // Update wallet balance in the state
                setWalletBalance(newBalance);
                navigate('/payment');

            })
            .catch(error => {
                console.error('Error updating wallet balance:', error);
                // Handle error
                alert('Error updating wallet balance. Please try again.');
            });
    };

    const handleSellNow = (event) => {
        event.preventDefault();
        let total = 0;
        if (sellOption === 'rupee') {
            total = goldAmount;
        } else if (sellOption === 'grams') {
            total = currentGoldPrice * goldAmount;
        }
        setTotalAmount(total);
        if (walletBalance >= total) {
            const updatedWalletBalance = walletBalance - total;
            // Update wallet balance
            updateWalletBalance(updatedWalletBalance);
        } else {
            // Show insufficient funds message
            alert('Insufficient funds. Please add balance to your wallet.');
        }
    };

    return (
        <>
            <LogoContainer />
            <Nav />
            <form className="sell-form" style={{ alignItems: "center", marginTop: "60px", marginBottom: "80px" }}>
                <h2 className='main'>Sell Digital Gold</h2>
                <hr />
                <div className="sell-container">
                    <div className="left-section">
                        <h3>Live Price</h3>
                        <h2 className='h2'>₹{currentGoldPrice}/gm</h2>
                        <p>Amount exclusive of Tax <br />(GST is not applicable)</p>
                    </div>
                    <div className="center-section">
                        <h3 className='h3'>Trade Now</h3>
                        <div className="sell-options">
                            <label>
                                <input
                                    type="radio"
                                    value="rupee"
                                    checked={sellOption === 'rupee'}
                                    onChange={() => handleSellOptionChange('rupee')}
                                />
                                Sell in rupee
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="grams"
                                    checked={sellOption === 'grams'}
                                    onChange={() => handleSellOptionChange('grams')}
                                />
                                Sell in grams
                            </label>
                            <p className="underline-text">Rs.<input type="text" id="rs" name="rs" onChange={handleGoldAmountChange} /></p>
                        </div>
                    </div>
                    <div className="right-section">
                        <p>Total amount: ₹{parseFloat(totalAmount).toFixed(2)}</p>
                        <button type="submit" className="btn btn-success" style={{ backgroundColor: "#571613", color: "white" }} onClick={handleSellNow}>Sell </button>
                    </div>
                </div>
            </form>
            <Footer />
        </>
    );
}

export default SellGold;