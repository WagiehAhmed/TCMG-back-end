const blogRoutes = require("express").Router()

const blogController = require("../controllers/blogController")

blogRoutes.get("/",blogController.getBlogs);
blogRoutes.get("/:id",blogController.getBlog);
blogRoutes.get("/search/:keyword",blogController.search);
blogRoutes.post("/",blogController.addBlog);
blogRoutes.delete("/:id",blogController.deleteBlog);
blogRoutes.put("/:id",blogController.updateBlog);


module.exports = blogRoutes;