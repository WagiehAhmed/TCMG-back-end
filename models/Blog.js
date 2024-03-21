const pool = require("../util/connectToDb");

class BlogModel {
  // get all admins
  static async getBlogs() {
    return new Promise((resolve, reject) => {
      pool.query("select * from blogs;", [], (error, result) => {
        if (!error) {
          resolve(result);
        }
        resolve(false);
      });
    });
  }
  // get blog by id
  static async getBlogById(id) {
    return new Promise((resolve, reject) => {
      pool.query("select * from blogs where id = ?;",
      [id], (error, result) => {
        if (!error) {
          resolve(result[0].id);
        }
        resolve(false);
      });
    });
  }
  // get blog by id
  static async getBlogItsef(id) {
    return new Promise((resolve, reject) => {
      pool.query("select * from blogs where id = ?;",
      [id], (error, result) => {
        if (!error) {
          resolve(result[0]);
        }
        resolve(false);
      });
    });
  }
  // search
  static async search(keyword) {
    return new Promise((resolve, reject) => {
      pool.query("select * from blogs where metaKeys like ?;",
      ["%"+keyword+"%"], (error, result) => {
        if (!error) {
          resolve(result);
        }
        resolve(false);
      });
    });
  }

  // get blog by title
  static async getBlogByTitle(title) {
    return new Promise((resolve, reject) => {
      pool.query("select * from blogs where title = ?;",
      [title], (error, result) => {
        if (!error) {
          resolve(result[0]);
        }
        resolve(false);
      });
    });
  }

  // add blog
  static async addBlog(title, description, content, category, image, date, metakeys) {
    return new Promise((resolve, reject) => {
      pool.query(
        "insert into blogs (title,description,content,category,image,date,metaKeys) values(?,?,?,?,?,?,?);",
        [title, description, content, category, image, date,metakeys],
        (error, result) => {
          if (!error && result.affectedRows === 1) {
            pool.query(
              "select * from blogs where id = ?",
              [result.insertId],
              (error, result) => {
                if (!error) {
                  resolve(result[0]);
                }
                // resolve(false);
              }
            );
          }
          // resolve(false);
        }
      );
    });
  }
  // delete blog
  static async deleteBlog(id) {
    return new Promise((resolve, reject) => {
      pool.query(
        "delete from blogs where id = ?;",
        [id],
        (error, result) => {
          if (!error) {
            resolve(result.affectedRows);
          }
          resolve(0);
        }
      );
    });
  }
   // update blog
   static async updateBlog(title, description, content, category, image, metakeys, date,id) {
    return new Promise((resolve, reject) => {
      pool.query(
        "update blogs set title = ?, description = ? ,content = ? , category = ?, image = ?, metakeys = ?, date = ? where id = ?;",
        [title, description, content, category, image, metakeys, date, id],
        (error, result) => {
          if (!error && result.affectedRows === 1) {
            pool.query(
              "select * from blogs where id = ?",
              [id],
              (error, result) => {
                if (!error) {
                  resolve(result[0]);
                }
                // resolve(false);
              }
            );
          }
          // resolve(false);
        }
      );
    });
  }
}

module.exports = BlogModel;
