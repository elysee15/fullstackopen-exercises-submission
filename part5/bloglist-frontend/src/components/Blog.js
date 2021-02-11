import React, { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const showWhenVisible = { display: visible ? '' : 'none' };
  const handleBlogVisible = () => (setVisible(!visible));

  const buttonLabel = visible === false ? "view" : "hide";

  return (
    <div style={blogStyle}>
      <div className="blog__default-info">
        {blog.title} {blog.author} <button type="button" onClick={handleBlogVisible}> {buttonLabel} </button>
      </div>
      <div style={showWhenVisible}>
        <div>
          <p> {blog.url} </p>
          <p> likes {blog.likes} <button type="button" onClick={handleLike} className="likeButton">like</button> </p>
          <p> {blog.author} </p>
        </div>
        <button onClick={handleDelete}>delete</button>
      </div>
    </div>
  );
};

export default Blog;
