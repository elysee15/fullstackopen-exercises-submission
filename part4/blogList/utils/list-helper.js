const _ = require('lodash');

const dummy = (blogs = []) => {
  return 1;
};

const totalLikes = (blogPosts = []) => {
  return blogPosts.length;
};

const favoriteBlog = (blogPosts = []) => {
  favoriteLikes = Math.max.apply(
    this,
    blogPosts.map((blog) => blog.likes)
  );
  let favorite = blogPosts.filter((blog) => {
    return blog.likes === favoriteLikes;
  });

  return {
    title: favorite[0].title,
    author: favorite[0].author,
    likes: favorite[0].likes,
  };
};

const mostBlogs = (blogPosts = []) => {
    return _.maxBy(blogPosts, (blogPost) => blogPost.blogs);
}

module.exports = { dummy, totalLikes, favoriteBlog };
