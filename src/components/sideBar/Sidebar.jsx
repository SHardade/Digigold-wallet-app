import React, { useState } from 'react';
import { FaBars, FaTh } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { BsCart2 } from "react-icons/bs";
import { TfiWallet } from "react-icons/tfi";
import { TbArrowsTransferDown } from "react-icons/tb";
import { PiArrowsCounterClockwiseLight } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import { FiLogIn } from "react-icons/fi";
import { RiUserFollowLine } from "react-icons/ri";
import './sideBar.css';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/buy",
            name: "Buy",
            icon: <HiOutlineShoppingBag />
        },
        {
            path: "/sell",
            name: "Sell",
            icon: <BsCart2 />
        },
        {
            path: "/wallet",
            name: "Wallet",
            icon: <TfiWallet />
        },
        {
            path: "/transaction",
            name: "Transactions",
            icon: <TbArrowsTransferDown />
        },
        {
            path: "/conversion",
            name: "Jewellery Conversion",
            icon: <PiArrowsCounterClockwiseLight />
        },
        {
            path: "/signUp",
            name: "Register",
            icon: <RiUserFollowLine />
        },
        {
            path: "/signIn",
            name: "Login",
            icon: <FiLogIn />
        }
    ]
    return (
        <div className='side_container'>
            <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="side_logo">digi<span>GOLD</span></h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassname="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
