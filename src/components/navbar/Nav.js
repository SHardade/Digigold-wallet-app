import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { BsCart2 } from "react-icons/bs";
import { TfiWallet } from "react-icons/tfi";
import { TbArrowsTransferDown } from "react-icons/tb";
import { PiArrowsCounterClockwiseLight } from "react-icons/pi";
import { FiLogIn } from "react-icons/fi";
import { RiUserFollowLine } from "react-icons/ri";
import { HiOutlineUserAdd } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import './nav.css';

const Nav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); 
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('User');
        setIsLoggedIn(false);
        navigate('/signIn');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <ul className="menu-items">
                    <li><a href="/">Dashboard</a></li>
                    <li><a href="/buy"><HiOutlineShoppingBag />Buy</a></li>
                    <li><a href="/sell"><BsCart2 />Sell</a></li>
                    <li><a href="/wallet"><TfiWallet />Wallet</a></li>
                    <li><a href="/transaction"><TbArrowsTransferDown />Transactions</a></li>
                    <li><a href="/conversion"><PiArrowsCounterClockwiseLight />Jewellery Conversion</a></li>
                    {isLoggedIn ? (
                        <li className="login_dropdown">
                            <a href="#"><HiOutlineUserAdd /><IoIosArrowDown /></a>
                            <div className="dropdown_content">
                                <a href="/user"><FiLogIn />My Account</a>
                                <a href="#" onClick={handleLogout}><RiUserFollowLine />Logout</a>
                            </div>
                        </li>
                    ) : (
                        <li><a href="/signIn"><FiLogIn />Login</a></li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
