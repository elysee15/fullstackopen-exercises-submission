const Blog = require("../models/blog");

const initialState = [
    {
      title: "Bnojur",
      author: "Koand",
      url: "http://google.com",
      likes: 4,
    },
    {
      title: "Ali baba",
      author: "Tom",
      url: "http://yahoo.com",
      likes: 5,
    },
  ];

const blogPostAtEnd = async () => {
  const blogPosts = await Blog.find({})
  return blogPosts.map(blog => blog.toJSON())
}

module.exports = { initialState, blogPostAtEnd };