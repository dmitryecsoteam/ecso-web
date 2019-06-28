import React from 'react';
import classNames from 'classnames';

export default ({
    children,
    error = false,
    errorText = '',
    label = '',
    disabled = false
} = props) => {

    const divClassName = classNames(
        'search-form__label-input',
        { 'search-form__label-input--error': error },
        { 'search-form__label-input--disabled': disabled}
    );

    const errorClassName = classNames(
        'search-form__error',
        { 'search-form__error--open': error }
    );

    return (
        <div className="search-form__input-container">
            <div className={divClassName}>
                <label className="search-form__label">{label}</label>
                {children}
            </div>
            <div className={errorClassName}>
                <span className="search-form__error-text">{errorText}</span>
            </div>
        </div>
    );
}