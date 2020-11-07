import React from 'react';
import './Header.css';
import HP from '../hp-logo.png'

const Header = () => {
  return (
    <section className='header-container'>
      <img src={HP} alt='Harry Potter logo'></img>
    </section>
  )
}

export default Header;