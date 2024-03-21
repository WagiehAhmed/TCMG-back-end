const pool = require("../util/connectToDb");

class AdminModel {
  // get all admins
  static async getAdmins() {
    return new Promise((resolve, reject) => {
      pool.query("select * from admins;", [], (error, result) => {
        if (!error) {
          resolve(result);
        }
        resolve(false);
      });
    });
  }
  // get admin by id
  static async getAdminByEmail(id) {
    return new Promise((resolve, reject) => {
      pool.query(
        "select * from admins where id = ?;",
        [id],
        (error, result) => {
          if (!error) {
            resolve(result[0]);
          }
          resolve(false);
        }
      );
    });
  }
  // get admin by email
  static async getAdminByEmail(email) {
    return new Promise((resolve, reject) => {
      pool.query(
        "select * from admins where email = ?;",
        [email],
        (error, result) => {
          if (!error && result.length > 0) {
            resolve(result[0]);
          }
          resolve(false);
        }
      );
    });
  }

  // get admin by id
  static async getAdminById(id) {
    return new Promise((resolve, reject) => {
      pool.query(
        "select * from admins where id = ?;",
        [id],
        (error, result) => {
          if (!error && result.length > 0) {
            resolve(result[0].id);
          }
          resolve(false);
        }
      );
    });
  }

  // add admin
  static async addAdmin(name, email, password, phone, permission) {
    return new Promise((resolve, reject) => {
      pool.query(
        "insert into admins (name,email,password,phone,permission) values(?,?,?,?,?);",
        [name, email, password, phone, permission],
        (error, result) => {
          if (!error && result.affectedRows === 1) {
            pool.query(
              "select * from admins where id = ?",
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

  // delete admin
  static async deleteAdmin(id) {
    return new Promise((resolve, reject) => {
      pool.query("delete from admins where id = ?;", [id], (error, result) => {
        if (!error) {
          resolve(result.affectedRows);
        }
        resolve(0);
      });
    });
  }

  // update admin
  static async updateAdmin(name, email, password, phone, permission, id) {
    return new Promise((resolve, reject) => {
      pool.query(
        "update admins set name = ?, email = ? ,password = ? , phone = ?, permission = ? where id = ?;",
        [name, email, password, phone, permission, id],
        (error, result) => {
          if (!error && result.affectedRows === 1) {
            pool.query(
              "select * from admins where id = ?",
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

module.exports = AdminModel;
