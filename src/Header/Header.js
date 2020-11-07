import React from 'react';
import './Header.css';
import HP from '../hp-logo.png'

const Header = () => {
  return (
    <section className='header-container'>
      <img src={HP} className='hp-logo' alt='Harry Potter logo'></img>
      <article className='nav-container'>
        <h1 className='header-link'>home</h1>
        <h1 className='header-link'>characters</h1>
        <h1 className='header-link'>spells</h1>
      </article>
    </section>
  )
}

export default Header;