import React from 'react';
import classNames from 'classnames';

export default (props) => {

    const divClassName = classNames(
        'search-form__label-input',
        { 'search-form__label-input--error': props.error }
    );

    const errorClassName = classNames(
        'search-form__error',
        { 'search-form__error--open': props.error }
    );

    return (
        <div className="search-form__input-container">
            <div className={divClassName}>
                <label className="search-form__label">{props.label}</label>
                {props.children}
            </div>
            <div className={errorClassName}>
                <span className="search-form__error-text">{props.errorText}</span>
            </div>
        </div>
    );
}