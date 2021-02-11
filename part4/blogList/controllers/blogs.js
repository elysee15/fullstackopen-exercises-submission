const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    const decodeToken = jwt.decode(request.token, process.env.SECRET);

    if (!request.token || !decodeToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodeToken.id);

    const blog = new Blog({
      likes: body.likes || 0,
      user: user._id,
      ...body,
    });

    if (blog && (!blog.title || !blog.url)) {
      return response.status(400).json("Title or url are missing");
    }
    const savedBlog = await blog.save();
    user.posts = user.posts.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog.toJSON());
  } catch (e) {
    next(e);
  }
});

blogRouter.delete("/:id", async (request, response) => {
  const token = request.token;
  const paramsId = request.params.id;
  const decodedToken = jwt.decode(token, process.env.SECRET);
  const blog = await Blog.findById(paramsId);

  if (!blog) {
    return response.status(404).json({ error: "This id doesn't exist" });
  }

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response
      .status(404)
      .json({ error: "You are not authorized to delete this blog" });
  }

  await Blog.findByIdAndRemove(paramsId);
  response
    .status(204)
    .json({ message: `${blog.title} has been deleted successfully` });
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
