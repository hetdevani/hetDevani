const express = require("express")
const route = express.Router()
const blogController = require("../controller/blogController")

const {checkAccess} = require("../utils/checkAccessKey")

route.post("/create",checkAccess,blogController.addBlog)
route.get("/show",checkAccess,blogController.getBlog)
route.patch("/update",checkAccess,blogController.editBlog)
route.delete("/delete",checkAccess,blogController.deleteBlog)

            

module.exports = route