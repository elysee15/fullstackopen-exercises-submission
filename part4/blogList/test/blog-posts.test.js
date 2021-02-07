const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let _blog of helper.initialState) {
    const blog = new Blog(_blog);
    await blog.save();
  }
});

test("should return total amount of notes in json", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialState.length);
});

test("should verify that the unique identifier is named id", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
  expect(response.body[1].id).toBeDefined();
});

test("should create a new post successfully", async () => {
  const newBlogPost = {
    title: "Elon Musk",
    author: "Jet",
    url: "http://spacex.com",
    likes: 35,
  };

  await api
    .post("/api/blogs")
    .send(newBlogPost)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogPosts = await helper.blogPostAtEnd();
  expect(blogPosts.length).toBe(helper.initialState.length + 1);
  expect(blogPosts.map((blog) => blog.title)).toContain("Elon Musk");
});

test("should verify that likes property is 0 by default", async () => {
  const newBlogPost = {
    title: "Ariane",
  };
  const response = await api.post("/api/blogs").send(newBlogPost);
  expect(response.body.likes).toBe(0);
});

test("should throw error if url and title are missing", async () => {
  const newBlogPost = {};
  await api.post("/api/blogs").send(newBlogPost).expect(400);
});

test("should delete a blog post", async () => {
  const blogAtStart = await helper.blogPostAtEnd();
  const blogPostToDelete = blogAtStart[0];

  await api.delete(`/api/blogs/${blogPostToDelete.id}`).expect(204);

  const blogAtEnd = await helper.blogPostAtEnd();

  expect(blogAtEnd.length).toBe(helper.initialState.length - 1);
  expect(blogAtEnd.map((blog) => blog.title)).not.toContain(
    blogPostToDelete.title
  );
});

test("should update a blog post", async () => {
  const updateBlogPost = {
    title: "Zero State",
    likes: 45,
    url: 'https://aviso.com'
  };
  const blogAtStart = await helper.blogPostAtEnd();
  const blogToUpdate = blogAtStart[0];
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updateBlogPost)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
