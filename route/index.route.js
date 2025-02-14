const express = require("express")
const route = express.Router()

const blogRoute = require("./blog.route")
route.use("/blog",blogRoute)

module.exports =route