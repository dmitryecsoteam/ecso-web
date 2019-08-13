import React, { useState } from 'react';

export default () => {

    const [isOpen, setIsOpen] = useState(true);

    console.log(isOpen)

    return (
        <React.Fragment>
            {isOpen && (
                <div className="info__container">
                    <button onClick={() => setIsOpen(false)} className="info__button">x</button>
                    <p className="info__text">Test data for origin: Tokyo, Osaka</p>
                </div>
                )}
        </React.Fragment>
    );

}

