import React, { useEffect, useState } from 'react';
import Footer from '../footer/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const CartPage = ({ cartItems }) => {
    const [sellOption, setSellOption] = useState('rupee');
    const [goldAmount, setGoldAmount] = useState(0);
    const [currentGoldPrice, setCurrentGoldPrice] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [walletBalance, setWalletBalance] = useState(0);
    const navigate = useNavigate();
    const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price.replace(',', '')), 0);
    useEffect(() => {
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

    const updateWalletBalance = (newBalance) => {
        const currentUser = JSON.parse(localStorage.getItem('User'));
        if (currentUser && currentUser.userId) {
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
        }
    };
    const handleSellNow = (event) => {
        event.preventDefault();
        if (walletBalance >= totalPrice) {
            const updatedWalletBalance = walletBalance - totalPrice;
            // Update wallet balance
            updateWalletBalance(updatedWalletBalance);
        } else {
            // Show insufficient funds message
            alert('Insufficient funds. Please add balance to your wallet.');
        }
    };
    return (
        <div>
            <nav className="navbar" style={{ height: "60px", backgroundColor: "#571613" }}>
                <h2 style={{ color: "white" }}>Cart Items {cartItems.length}</h2>
            </nav>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: "20px", marginBottom: "25%" }}>
                {cartItems.map((item, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', padding: '10px' }}>
                        <img src={item.image} alt={item.name} style={{ height: '100px', objectFit: 'cover', marginBottom: '10px' }} />
                        <div>
                            <span><b>Name:</b> {item.name}</span><br />
                            <span><b>Price:</b> {item.price}</span>
                        </div>
                    </div>
                ))}
                <div >
                    <h3>Total Price: Rs. {totalPrice.toFixed(2)}</h3>
                    <button type="submit" className='btn btn-success' style={{ backgroundColor: "#571613" }} onClick={handleSellNow}>Buy</button>

                </div>
            </div>
            <Footer />
        </div>

    );
};

export default CartPage;

