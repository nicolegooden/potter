import React from 'react';
import './Header.css';
import HP from '../hp-logo.png'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <section className='header-container'>
      <img src={HP} className='hp-logo' alt='Harry Potter logo'></img>
      <article className='nav-container'>
        <NavLink to='/home' className='nav-link'><h1 className='header-link'>home</h1></NavLink>
        <NavLink to='/characters' className='nav-link'><h1 onClick={props.getStudentsByHouse} className='header-link'>characters</h1></NavLink>
        <NavLink to='/spells' className='nav-link'><h1 className='header-link'>spells</h1></NavLink>
        <h1 onClick={props.resetGame} className='header-link'>reset</h1>
      </article>
    </section>
  )
}

export default Header;

Header.propTypes = {
  getStudentsByHouse: PropTypes.func,
  resetGame: PropTypes.func.isRequired
}