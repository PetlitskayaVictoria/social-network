import React from 'react';
import classes from './Header.module.css'

function Header() {
  return (
    <div className={classes.headerContainer}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Fandom_heart-logo.svg/1200px-Fandom_heart-logo.svg.png"/>
    </div>
  );
}

export default Header;
