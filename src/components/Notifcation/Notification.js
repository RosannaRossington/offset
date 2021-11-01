import React from 'react';
import './Notification.scss';

const Notification = ({messages}) => {
    return (
        <div className="notificationContainer">
            <p className="notificationText">{messages}</p>
        </div>
    )
}

export default Notification;