import React from 'react';
import classNames from 'classnames';
import TrackVisibility from 'react-on-screen';

export default ({ linkTo, backgroundImage, textMain, textSecondary, textButton }) => {

    const BannerVisible = ({ isVisible }) => {
        const className = classNames('banner__container', { 'banner__container--animation': isVisible });
        return (
            <div className={className}>
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
    };

    return (
        <TrackVisibility once className="banner">
            <BannerVisible />
        </TrackVisibility>
    );
}