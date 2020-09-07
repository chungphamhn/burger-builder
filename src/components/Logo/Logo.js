import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import './Logo.css';

const logo = (props) => (

    <div
        className="Logo"
        style={{ height: props.height }}
        onClick={props.clicked}
    >
        <img src={burgerLogo} alt="MyBurger" />
    </div>
);

export default logo;