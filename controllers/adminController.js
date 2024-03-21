const AdminModel = require("../models/Admin");
const { adminSchema } = require("../util/validation");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");

class AdminController {
  // get login
  static async login(req, res) {
    const { email, password } = req.body;
    const { error } = adminSchema.validate({ email, password });
    if (!error) {
      try {
        const admin = await AdminModel.getAdminByEmail(email);
        // console.log(admin);
        if (admin && (await bcrypt.compare(password, admin.password))) {
          const token = jwt.sign(admin.id, "jsonwebtokensecret");
          return res.status(200).json({ message: "Success",token});
          // return res.status(200).json({ message: "Success", admin: admin ,token});
        }
        throw new Error("Invalid email or password");
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    } else {
      return res.status(400).json({ message: error.details[0].message });
    }
  }
  // get all admins
  static async getAdmins(req, res) {
    const result = await AdminModel.getAdmins();
    if (result) {
      return res.status(200).json({ admins: result });
    }
    return res.status(400).json({ message: "No Admins founded" });
  }

  // add admin
  static async addAdmin(req, res) {
    const { name, email, password, phone, permission } = req.body;
    try {
      const founded = await AdminModel.getAdminByEmail(email);
      if (founded) {
        return res.status(400).json({ message: "This admin already exists" });
      }
      // var fileName = req.files.image.name;
      // fileName = Date.now() + "_" + fileName;
      // const filePath = path.join(
      //   path.dirname(process.mainModule.filename),
      //   "public/admins/",
      //   fileName
      // );

      // const image = fileName;
      // password hashing
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const admin = await AdminModel.addAdmin(
        name,
        email,
        hashPassword,
        phone,
        permission
      );
      if (admin) {
        // req.files.image.mv(filePath);
        return res.status(200).json({ admin });
      }
      return res.status(400).json({ message: "failed" });
    } catch (err) {
      console.log(err)
      return res.status(400).json({ message: err.message });
    }
  }

  // delete admin
  static async deleteAdmin(req, res) {
    const { id } = req.params;
    try {
      const adminId = await AdminModel.getAdminById(id);
      if (adminId) {
        const affectedRows = await AdminModel.deleteAdmin(id);
        if (affectedRows) {
          return res.status(200).json({ adminId });
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

  // update admin
  static async updateAdmin(req, res) {
    // do not forget to check new date
    const { id } = req.params;
    const { name, email, password, phone, permission } = req.body;
    try {
      const adminId = await AdminModel.getAdminById(id);
      if (adminId) {
        const updatedAdmin = await AdminModel.updateAdmin(
          name,
          email,
          password,
          phone,
          permission,
          id
        );
        if (updatedAdmin) {
          return res.status(200).json({ updatedAdmin });
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

module.exports = AdminController;
