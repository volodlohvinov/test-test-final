import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../store/reducers/cartSlice";
import './Header.scss'
import { Link } from "react-router-dom"

const linkStyle = {
    textDecoration: 'none', 
    color: 'inherit' 
};

const Header = () => {
    const cartItems = useSelector(selectCartItems);
    const cartItemCount = cartItems.length;

    


    return( <header>
        <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        </div>
        <div className="wrapper">
            <ul className="Header__menu-container">
            <li className="Header__menu"><Link style={linkStyle} to='/'><img className="Header__logo" src="../static/logo.png" alt="logo"  /></Link></li>
                <li className="Header__menu"><Link style={linkStyle} to='/'>Main</Link></li>
                <li className="Header__menu"><Link style={linkStyle} to='/smoothie'>Smoothie constructor</Link></li>
                <li className="Header__menu"><Link style={linkStyle} to='/about'>About us</Link></li>
                <li className="Header__menu"> <Link style={linkStyle} to='/cart'><i className="fa fa-shopping-basket" style={{ fontSize: 24, color: "#800000" }}> </i> {cartItemCount > 0 && <span className="CartItemBadge">{cartItemCount}</span>}</Link></li> 
                
                
            </ul>
        </div>

    </header>
    )
}

export default Header