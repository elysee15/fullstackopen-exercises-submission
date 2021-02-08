import React from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <div>
        <p> {blog.url} </p>
        <p> likes {blog.likes} <button type="button">like</button> </p>
        <p> {blog.author} </p>
      </div>
    </div>
  )}

export default Blog
