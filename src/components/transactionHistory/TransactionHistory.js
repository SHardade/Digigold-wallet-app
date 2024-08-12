import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../navbar/Nav';
import LogoContainer from '../navbar/LogoContainer';
import Footer from '../footer/Footer';
import './transactionHistory.css';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filter, setFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/transaction_history')
            .then(response => {
                setTransactions(response.data);
                setFilteredTransactions(response.data);
            })
            .catch(error => {
                console.error('Error fetching transaction data:', error);
            });
    }, []);

    useEffect(() => {
        let filtered = transactions;
        if (filter !== 'All') {
            if (filter === 'Successful') {
                filtered = filtered.filter(transaction => transaction.transactionStatus === 'Success');
            } else if (filter === 'Failed') {
                filtered = filtered.filter(transaction => transaction.transactionStatus === 'Failed');
            } else if (filter === 'Buy' || filter === 'Sell' || filter === 'Convert_to_physical') {
                filtered = filtered.filter(transaction => transaction.transactionType === filter);
            }
        }
        setFilteredTransactions(filtered);
    }, [filter, transactions]);

    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <LogoContainer />
            <Nav />
            <div className="transaction-history" style={{alignItems:"center", marginTop:"90px", marginBottom:"9.58%"}}>
                <h2>Transaction History</h2>
                <div className="filter-dropdown">
                    <label htmlFor="filter">Select Filter:</label>
                    <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <optgroup label="All">
                            <option value="All">All</option>
                            <option value="Successful">Successful</option>
                            <option value="Failed">Failed</option>
                        </optgroup>
                        <optgroup label="Transaction Type">
                            <option value="Buy">Buy</option>
                            <option value="Sell">Sell</option>
                            <option value="Convert_to_physical">Convert To Physical</option>
                        </optgroup>
                    </select>
                </div>
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Transaction Type</th>
                            <th>Transaction Status</th>
                            <th>Date Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTransactions.map(transaction => (
                            <tr key={transaction.transactionId}>
                                <td>{transaction.transactionId}</td>
                                <td>{transaction.quantity}</td>
                                <td className="amount">{transaction.amount}</td>
                                <td>{transaction.transactionType}</td>
                                <td>
                                    <span className={`transaction-status-badge ${transaction.transactionStatus.toLowerCase()}`}>
                                        {transaction.transactionStatus}
                                    </span>
                                </td>
                                <td>{transaction.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ul className="pagination">
                    {Array(Math.ceil(filteredTransactions.length / itemsPerPage))
                        .fill()
                        .map((_, index) => (
                            <li key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
                                {index + 1}
                            </li>
                        ))}
                </ul>
            </div>
            <Footer />
        </>
    );
}

export default TransactionHistory;
