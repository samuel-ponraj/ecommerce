import React, { useEffect, useState } from 'react'
import './Header.css'
import logo from '../../assets/header/logo.png'
import Hamburger from "hamburger-react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Header = ({isMenuOpen, toggleMenu, cartCount, setSearchQuery, searchQuery, scrollToTop}) => {

  const [countChanged, setCountChanged] = useState(false);

  useEffect(() => {
    if (cartCount > 0) {
      setCountChanged(true);
      const timer = setTimeout(() => setCountChanged(false), 500); 
      return () => clearTimeout(timer); 
    }
  }, [cartCount]);

  return (
    <div className='header'>
      <div className="menu-icon">
        <Hamburger
          toggled={isMenuOpen}
          toggle={toggleMenu}
          rounded
          hideOutline={false}
          size={25}
        />
      </div>
        <div className="header-logo">
            <img src={logo} alt='Header-logo' width={200} height='auto' onClick={scrollToTop}/>
        </div>
        <div className="header-search">
          <input type="text" 
                  placeholder='Search for Products'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}/>
        </div>
        <div className="header-options">
          <div className="cart">
            <ShoppingCartOutlinedIcon className="cart-icon" sx={{fontSize:'28px'}}/>
            {cartCount > 0 && <span className={`cart-count ${countChanged ? 'animate-count' : ''}`}>{cartCount}</span>}
          </div>
          <p>Cart</p>
        </div>
    </div>
  )
}

export default Header