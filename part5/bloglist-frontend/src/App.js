import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = React.createRef()

  useEffect(() => {
    async function fetchBlog() {
      const blogs = await blogService.getAll()
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      fetchBlog()
    }
  }, [])

  const handleUsername = ({ target }) => setUsername(target.value)
  const handlePassword = ({ target }) => setPassword(target.value)
  const handleTitle = ({ target }) => setTitle(target.value)
  const handleAuthor = ({ target }) => setAuthor(target.value)
  const handleUrl = ({ target }) => setUrl(target.value)
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setMessage({ data: 'Wrong username or password', type: 'error' })
      setTimeout(() => setMessage(null), 5000)
    }
  }
  const handleLogout = (e) => {
    window.localStorage.removeItem('user');
  }
  const handleNewBlog = async (e) => {
    e.preventDefault()
    blogFormRef.current.toggleVisibility();
    try {
      const blog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(blog))
      setMessage({
        data: ` a new blog ${blog.title} by ${blog.author} `,
        type: 'success',
      })
      // setVisible(false)
      setTimeout(() => setMessage(null), 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (e) {
      setMessage({ data: `${e}`, type: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {

    try {
      if(window.confirm(`Do you want to delete ${blog.title} by ${blog.author} ?`)){
        const response = await blogService.remove(blog.id);
        setBlogs(blogs.filter(b => b.id !== blog.id));
        setMessage({ data: `Blog ${blog.title} by ${blog.author} deleted successfully`, type: 'success'});
        setTimeout(() => setMessage(null), 5000);
      }
    } catch (e) {
      setMessage({ data: 'You are not authorized to delete this blog', type: 'error'});
      setTimeout(() => setMessage(null), 5000);
    }
    return;
  }

  const handleLike = async ({ id, likes, username, name, url, title }) => {
    const newBlog = {
      likes: ++likes,
      username,
      name,
      url,
      title
    }
    const response = await blogService.update(id, newBlog);
    setBlogs(blogs.map(blog => id === response.id ? response : blog));
  }

  const loggedInPage = () => {
    return (
      <>
        <h2>blogs</h2>
        {message && <Notification message={message.data} type={message.type} />}
        <p>
          {user.name} logged in
          <button type="button" onClick={handleLogout}>
            logout{' '}
          </button>
        </p>
        <h2>Create new</h2>
        <Togglable
          buttonLabel="new blog"
          ref={blogFormRef}
        >
          <NewBlog
            handleAuthor={handleAuthor}
            handleUrl={handleUrl}
            handleNewBlog={handleNewBlog}
            handleTitle={handleTitle}
            url={url}
            author={author}
            title={title}
          />
        </Togglable>
        {blogs.map((blog, index) => (
          <Blog key={index} blog={blog} handleLike={() => handleLike(blog)} handleDelete={() => handleDelete(blog)}/>
        ))}
      </>
    )
  }

  return (
    <div>
      {user === null ? (
        <LoginForm
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          handleLogin={handleLogin}
          username={username}
          password={password}
          message={message}
        />
      ) : (
        loggedInPage()
      )}
    </div>
  )
}

export default App
