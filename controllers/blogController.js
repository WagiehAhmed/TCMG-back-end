const BlogModal = require("../models/Blog");
const path = require("path");
const cloudinary =require("cloudinary")

class BlogController {
  // get all blogs
  static async getBlogs(req, res) {
    const result = await BlogModal.getBlogs();
    // console.log(result);
    if (result) {
      return res.status(200).json({ message: "Success", blogs: result });
    }
    return res.status(400).json({ message: "fail" });
  }
  // get blog
  static async getBlog(req, res) {
    const result = await BlogModal.getBlogItsef(req.params.id);
    // console.log(result);
    if (result) {
      return res.status(200).json({ blog: result });
    }
    return res.status(400).json({ message: "fail" });
  }
  // search
  static async search(req, res) {
    const blogs = await BlogModal.search(req.params.keyword);
    // console.log(result);
    if (blogs) {
      return res.status(200).json({ blogs });
    }
    return res.status(400).json({ message: "fail" });
  }

  // add blog
  static async addBlog(req, res) {
    console.log(req.body)
    console.log(req.files)
    const { title, description, content, category, date, metaKeys, } = req.body;
    try {
      const founded = await BlogModal.getBlogByTitle(title);
      if (founded) {
        return res.status(400).json({ message: "This blog already exists" });
      }

      var fileName = req.files.image.name;
      fileName = Date.now() + "_" + fileName;
      const filePath = path.join(
        __dirname,
        "../public/blogs/",
        fileName
      );

      const image = fileName;
      const blog = await BlogModal.addBlog(
        title,
        description,
        content,
        category,
        image,
        date,
        metaKeys
      );

      if (blog) {
        req.files.image.mv(filePath);
        return res.status(200).json({ blog });
      }
      return res.status(400).json({ message: "failed" });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
  // delete blog
  static async deleteBlog(req, res) {
    const { id } = req.params;
    try {
      const blogId = await BlogModal.getBlogById(id);
      if (blogId) {
        const affectedRows = await BlogModal.deleteBlog(id);
        if (affectedRows) {
          return res.status(200).json({ blogId });
        } else {
          throw new Error("Invalid id");
        }
      } else {
        throw new Error("This account is not available for deletion");
      }
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // update blog
  static async updateBlog(req, res) {
    // do not forget to check new date
    const { id } = req.params;
    const { title, description, content, category, metaKeys, date } = req.body;
    try {
      const blog = await BlogModal.getBlogById(id);
      // console.log(blog);
      if (blog) {
        var fileName = req.files.image.name;
        fileName = Date.now() + "_" + fileName;
        const filePath = path.join(
          path.dirname(process.mainModule.filename),
          "public/blogs/",
          fileName
        );

        // console.log(affectedRows);
        const image = fileName;
        const updatedBlog = await BlogModal.updateBlog(
          title,
          description,
          content,
          category,
          image,
          metaKeys,
          date,
          id
        );
        if (updatedBlog) {
          req.files.image.mv(filePath);
          return res.status(200).json({ updatedBlog });
        } else {
          throw new Error("Invalid id");
        }
      } else {
        throw new Error("This account is not available for update");
      }
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}

module.exports = BlogController;
