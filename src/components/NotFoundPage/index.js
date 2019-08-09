import React from 'react';
import Header from '../Header';
import MessageCenter from '../MessageCenter';

export default () => {
    return <div>
        <Header />
        <MessageCenter text="404. Page not found" />
    </div>
}