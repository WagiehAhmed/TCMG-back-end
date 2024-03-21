const adminRouter = require("express").Router()

const adminCountroller = require("../controllers/adminController")

adminRouter.post("/login",adminCountroller.login);
adminRouter.get("/",adminCountroller.getAdmins);
adminRouter.post("/",adminCountroller.addAdmin);
adminRouter.delete("/:id",adminCountroller.deleteAdmin);
adminRouter.put("/:id",adminCountroller.updateAdmin);


module.exports = adminRouter;