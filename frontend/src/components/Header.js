import React from 'react';
import aroundtheus from '../images/aroundtheus.svg';

function Header() {
  return (
    <header className="header">
      <img src={aroundtheus} alt="Around the U.S. logo" className="header__logo" />
    </header>
  )
}

export default Header;
