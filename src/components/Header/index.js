import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo/logo2-darkgrey.png';

export default ({ title }) => (
    <header className="header">
        <div className="header__logo-container">
            <Link to="/">
                <img className="header__logo" src={logo} alt={"logo"} />
            </Link>
        </div>

        {title && <h1 className="header__title">{title}</h1>}

        <nav>
            <ul className="header__menu-container">
                <li className="header__menu-item">
                    <Link className="header__menu-link" to="/help">Help</Link>
                </li>
                <li className="header__menu-item">
                    <Link className="header__menu-link" to="/signin">Signin</Link>
                </li>
                <li className="header__menu-item">
                    <Link className="header__menu-link" to="/signup">Signup</Link>
                </li>
            </ul>
        </nav>
    </header>
);