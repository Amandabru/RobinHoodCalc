import './header.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
      <Link className='link link1' to='/'>
        ROBIN HOOD CALCULATOR
      </Link>
      <Link className='link link2' to='/how-to-use'>
        HOW TO USE
      </Link>
      <Link className='link link3' to='/about'>
        ABOUT
      </Link>
      <Link className='link link4' to='/team'>
        TEAM
      </Link>
    </div>
  );
};

export default Header;
