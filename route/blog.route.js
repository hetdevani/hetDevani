const express = require("express")
const route = express.Router()
const blogController = require("../controller/blogController")

const {checkAccess} = require("../utils/checkAccessKey")

route.post("/create",blogController.addBlog)
route.get("/show",blogController.getBlog)
route.patch("/update",blogController.editBlog)
route.delete("/delete",blogController.deleteBlog)

            

module.exports = route