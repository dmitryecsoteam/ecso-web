import React from 'react';

export default ({ linkTo, backgroundImage, textMain, textSecondary, textButton }) => {
    return (
        <div className="banner__container">
            <a
                className="banner__link"
                href={linkTo}
            >
                <div
                    className="banner__image"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                </div>
                <span className="banner__text banner__text--main">{textMain}</span>
                <span className="banner__text banner__text--secondary">{textSecondary}</span>
                <div className="banner__button">{textButton}</div>
            </a>
        </div>
    );
}