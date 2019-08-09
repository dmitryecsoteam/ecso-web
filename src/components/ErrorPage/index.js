import React from 'react';
import Header from '../Header';
import MessageCenter from '../MessageCenter';

export default () => {
    return (
        <div>
            <Header />
            <MessageCenter text="Something went wrong... Please&nbsp;try&nbsp;again&nbsp;later" />
        </div>
    )
};