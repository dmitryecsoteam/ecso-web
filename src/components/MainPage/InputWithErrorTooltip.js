import React from 'react';
import classNames from 'classnames';

export default ({
    children,
    error = false,
    errorText,
    label = '',
    disabled = false,
    hint = false,
    hintText
} = props) => {

    const divClassName = classNames(
        'search-form__label-input',
        { 'search-form__label-input--error': error },
        { 'search-form__label-input--disabled': disabled }
    );

    const errorClassName = classNames(
        'search-form__error',
        { 'search-form__error--open': error }
    );

    const hintClassName = classNames(
        'search-form__hint',
        { 'search-form__hint--open': hint }
    );

    return (
        <div className="search-form__input-container">
            <div className={hintClassName}>
                {hintText}
            </div>
            <div className={divClassName}>
                {label && <label className="search-form__label">{label}</label>}
                {children}
            </div>
            {errorText != null &&
                <div className={errorClassName}>
                    <span className="search-form__error-text">{errorText}</span>
                </div>
            }

        </div>
    );
}