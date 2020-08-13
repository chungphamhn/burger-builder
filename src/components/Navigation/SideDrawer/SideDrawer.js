import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/A-u-x/A-u-x';

const sideDrawer = (props) => {

    let attachedClasses = ["SideDrawer", "Close"];

    if (props.show) {
        attachedClasses = ["SideDrawer", "Open"];
    }

    return (
        <Aux>
            <Backdrop
                show={props.show}
                clicked={props.closed}
            />
            <div className={attachedClasses.join(' ')}>
                <div className="LogoSideDrawer">
                    <Logo />
                </div>

                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;