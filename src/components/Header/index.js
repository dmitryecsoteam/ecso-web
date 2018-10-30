import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div>
        <span>Header component</span>
        <Link to="/">Home</Link>
        <Link to="/help">Help</Link>
    </div>
);