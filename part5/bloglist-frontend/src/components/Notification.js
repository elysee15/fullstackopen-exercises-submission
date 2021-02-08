import React from 'react';

const Notification = ({ message, type }) => {
    return (
      <>
        { type === "success" && <div className="success"> {message} </div> }
        { type === "error" && <div className="error"> {message} </div> }
      </>
    )
  }

export default Notification;