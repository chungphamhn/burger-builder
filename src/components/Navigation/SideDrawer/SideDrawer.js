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
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className="LogoSideDrawer">
                    <Logo
                        height="80%"
                        clicked={props.logoToggleClicked}
                    />
                </div>

                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;