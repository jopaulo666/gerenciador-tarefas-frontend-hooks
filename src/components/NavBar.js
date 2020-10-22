import React from 'react';
import NavBarItem from './NavBarItem';
import { APP_NAME } from '../constants';
import { useNavBarItems } from '../hooks/useNavBarItems'

export const NavBar = () => {
    const navBarItems = useNavBarItems();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <span className="navbar-brand mb-0 h1">{APP_NAME}</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    {navBarItems.items.map(item => <NavBarItem key={item.name} item={item} />)} 
                </div>
                <span className="navbar-text">
                    {navBarItems.helloMessage}
                </span>
            </nav>

        </div>
    );
}

export default NavBar;