const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");


blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodeToken = jwt.decode(request.token, process.env.SECRET);

  if (!token || !decodeToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodeToken.id);

  const blog = new Blog({
    likes: body.likes || 0,
    user: user._id,
    ...body,
  });

  if (blog && !(blog.title && blog.url)) {
    return response.status(400).json("400 Bad request");
  }
  const savedBlog = await blog.save();
  user.posts = user.posts.concat(savedBlog._id);
  user.save();

  response.status(200).json(savedBlog.toJSON());
});

blogRouter.delete("/:id", async (request, response) => {
  const token = request.token;
  const paramsId = request.params.id;

  const decodedToken = jwt.decode(token, process.env.SECRET); 
  const blog = await Blog.findById(paramsId);

  if (blog.user.toString() !== decodedToken.id.toString()){
    return response.status(404).json({ error: "You are not authorized to delete this blog"});
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const updated = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );
  response.status(200).json(updated.toJSON());
});

module.exports = blogRouter;
