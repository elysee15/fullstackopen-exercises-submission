import React from 'react'


const NewBlog = ({ handleNewBlog, title, handleTitle, url, handleUrl, author, handleAuthor }) => {
  return (
    <>
      <form onSubmit={handleNewBlog}>
        title: <input type="text" value={title} onChange={handleTitle} /> <br />
        author: <input
          type="text"
          value={author}
          onChange={handleAuthor}
        />{' '}
        <br />
        url: <input type="text" value={url} onChange={handleUrl} /> <br />
        <input type="submit" value="create" /> <br />
      </form>
    </>
  )
}

export default NewBlog