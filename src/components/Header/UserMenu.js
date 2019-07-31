import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import userIcon from '../../images/icons/user.png';
import Signout from './Signout';



export default ({ user }) => {

    const [isActive, setIsActive] = useState(false);

    // Add global event listeners to catch clicks outside user menu to close it
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    });

    const handleClickOutside = (event) => {
        
        // Don't change state if one of user menu items were clicked
        if (isActive && !event.target.className.includes('user-menu__link')) setIsActive(false);
    }

    const DropdownMenu = <div className="user-menu__dropdown-container">
        <div className="user-menu__dropdown">
            <h4 className="user-menu__name">{user.name}</h4>
            <p className="user-menu__email">{user.email}</p>
            <ul className="user-menu__list">
                <li className="user-menu__item user-menu__item--top-border">
                    <Link
                        className="user-menu__link"
                        to="/notifications"
                    >
                        My notifications
            </Link>
                </li>
                <li className="user-menu__item">
                    <Signout />
                </li>
            </ul>
        </div>
    </div>



    return (
        <button 
            className="header__menu-button" 
            onClick={() => setIsActive(!isActive)}
        >
            <div className="user-menu__image-container" >
                <img className="user-menu__image" src={userIcon} />
            </div>

            {isActive && DropdownMenu}

        </button>
    );
}

