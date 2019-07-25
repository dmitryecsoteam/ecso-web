import React from 'react';
import { Link } from 'react-router-dom';

import userIcon from '../../images/icons/user.png';
import Signout from './Signout';







export default class UserMenu extends React.Component {
    state = {
        isActive: false
    }

    handleClickMenu = () => {
        this.setState({
            isActive: !this.state.isActive
        });
    }

    render() {
        const { user } = this.props;
        const { isActive } = this.state;

        console.log(useState)

        const Dropdown = <div className="user-menu__dropdown-container">
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
            <button className="header__menu-button" onClick={this.handleClickMenu}>
                <div className="user-menu__image-container">
                    <img className="user-menu__image" src={userIcon} />
                </div>

                {isActive && Dropdown}

            </button>
        )
    }
}
