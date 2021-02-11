import React from "react";

const NewBlog = ({
  handleNewBlog,
  title,
  handleTitle,
  url,
  handleUrl,
  author,
  handleAuthor,
}) => {
  
  return (
    <>
      <form onSubmit={handleNewBlog} className="form">
        title:
        <input type="text" className="title" value={title} onChange={handleTitle} />{" "}
        <br />
        author:
        <input className="author" type="text" value={author} onChange={handleAuthor} />
        <br />
        url: <input
          className="url"
          type="text"
          value={url}
          onChange={handleUrl}
        />
        <br />
        <input type="submit" value="create" /> <br />
      </form>
    </>
  );
};

export default NewBlog;
