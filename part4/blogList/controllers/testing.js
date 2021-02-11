const mongoose = require("mongoose");
const testingRouter = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');

testingRouter.post('/', async (req, res) => {
    await User.deleteMany({});
    await Blog.deleteMany({});    
    res.status(204).json('database cleared successfully');
})

module.exports = testingRouter;