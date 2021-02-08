import React from 'react'
import Notification from './Notification'

const LoginForm = ({ handleUsername, handlePassword, handleLogin, username, password, message }) => {
  return (
    <>
      {message && <Notification message={message.data} type={message.type} />}
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        username{' '}
        <input type="text" value={username} onChange={handleUsername} /> <br />
        password{' '}
        <input
          type="password"
          value={password}
          onChange={handlePassword}
        />{' '}
        <br />
        <input type="submit" value="login" />
      </form>
    </>
  )
}

export default LoginForm