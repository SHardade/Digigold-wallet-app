import React, { useState, useEffect } from 'react';
import Nav from '../navbar/Nav';
import LogoContainer from '../navbar/LogoContainer';
import Footer from '../footer/Footer';
import axios from 'axios';
import './dashboard.css';
import { Container } from 'reactstrap';

const Dashboard = ({ userId }) => {
    const [transactions, setTransactions] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [walletBalance, setWalletBalance] = useState(0);
    const [goldPrice, setGoldPrice] = useState(0);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('User'));
        if (currentUser && currentUser.userId) {
            axios.get('http://localhost:8080/api/v1/transaction_history')
                .then(response => {
                    setTransactions(response.data.slice(-5));
                })
                .catch(error => {
                    console.error('Error fetching transactions:', error);
                });

            axios.get(`http://localhost:8080/api/v1/users/check_balance/${currentUser.userId}`)
                .then(response => {
                    setWalletBalance(response.data);
                    return axios.get(`http://localhost:8080/api/v1/users/${currentUser.userId}`);
                })
                .then(userResponse => {
                    setUserDetails(userResponse.data);
                })
                .catch(error => {
                    console.error('Error fetching profile data:', error);
                });

            axios.get('http://localhost:8080/api/v1/vendor/price')
                .then(response => {
                    setGoldPrice(response.data);
                })
                .catch(error => {
                    console.error('Error fetching gold price:', error);
                });

            const interval = setInterval(() => {
                setTime(new Date());
            }, 1000);

            return () => clearInterval(interval);
        }
    }, []);


    return (
        <>
            <LogoContainer />
            <Nav />
            <div className="dashboard">
                    <div>
                        <h2 className="card-title">Live Gold Price</h2>&nbsp;
                        <p>{time.toLocaleTimeString()}</p>
                        <p>₹{goldPrice}/gm</p>
                    </div>
                <div>
                    <h2 className="card-title">Wallet Balance</h2>&nbsp;
                    <p className="balance">₹{parseFloat(walletBalance).toFixed(2)}</p>
                </div>
                <div>
                    <h2 className="card-title">User Details</h2>&nbsp;
                    <p>Name: {userDetails.name}</p>
                    <p>Email: {userDetails.email}</p>
                </div>
                <div>
                    <h2 className="card-title">Recent Transactions</h2>&nbsp;
                    <table className="transaction-table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.transactionId}>
                                    <td>{transaction.transactionId}</td>
                                    <td className="amount">{transaction.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
