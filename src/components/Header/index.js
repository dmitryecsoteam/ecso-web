import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import classNames from 'classnames';

import { withSession, Session } from '../../auth/session';

import Signup from './Signup';
import Signin from './Signin';
import UserMenu from './UserMenu';
import logo from '../../images/logo/logo2-darkgrey.png';

export class Header extends React.Component {
    state = {
        signupIsOpen: false,
        signinIsOpen: false
    }

    openSignup = () => {
        this.setState({ signupIsOpen: true });
    }

    closeSignup = () => {
        this.setState({ signupIsOpen: false });
    }

    openSignin = () => {
        this.setState({ signinIsOpen: true });
    }

    closeSignin = () => {
        this.setState({ signinIsOpen: false });
    }

    render() {

        const { title, titleColorDark, user, fetchUser } = this.props;

        const menuWithoutAuth = <nav>
            <ul className="header__menu-container">
                <li className="header__menu-item">
                    <Link className="header__menu-link" to="/help">Help</Link>
                </li>
                <li className="header__menu-item">
                    <button className="header__menu-button" onClick={this.openSignin}>Signin</button>
                </li>
                <li className="header__menu-item">
                    <button className="header__menu-button" onClick={this.openSignup}>Signup</button>
                </li>
            </ul>
        </nav>;

        const menuWithAuth = <nav>
            <ul className="header__menu-container">
                <li className="header__menu-item">
                    <Link className="header__menu-link" to="/help">Help</Link>
                </li>
                <li className="header__menu-item">
                    <UserMenu user={user}/>
                </li>
            </ul>
        </nav>;

        const titleClassName = classNames('header__title', {
            'header__title--dark': titleColorDark
        });

        return (
            <header className="header">
                <div className="header__logo-container">
                    <Link to="/">
                        <img className="header__logo" src={logo} alt={"logo"} />
                    </Link>
                </div>

                {title && <h1 className={titleClassName}>{title}</h1>}

                {user ? menuWithAuth : menuWithoutAuth}



                <Modal
                    isOpen={this.state.signupIsOpen}
                    onRequestClose={this.closeSignup}
                    className="header__modal"
                    overlayClassName="header__modal-overlay"
                >
                    <div className="header__close-button-container">
                        <button onClick={this.closeSignup} className="header__close-button">&#10005;</button>
                    </div>
                    <Signup closeModal={this.closeSignup} fetchUser={fetchUser} />
                </Modal>

                <Modal
                    isOpen={this.state.signinIsOpen}
                    onRequestClose={this.closeSignin}
                    className="header__modal"
                    overlayClassName="header__modal-overlay"
                >
                    <div className="header__close-button-container">
                        <button onClick={this.closeSignin} className="header__close-button">&#10005;</button>
                    </div>
                    <Signin closeModal={this.closeSignin} fetchUser={fetchUser} />
                </Modal>
            </header>
        );
    }
}

export default withSession(Header);