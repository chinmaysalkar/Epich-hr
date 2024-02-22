const express = require("express");
const upload = require("../middleware/multer");
const { verifyToken } = require("../middleware/checkAuth");
const {
  login,
  createUser,
  viewUser,
} = require("../controllers/userController");
const {
  createRole,
  viewRole,
  updateRole,
} = require("../controllers/roleController");
const {
  addDepartment,
  viewDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/department");
const {
  addHoliday,
  updateHoliday,
  deleteHoliday,
  viewHoliday,
} = require("../controllers/hoilidayController");
const {
  createClient,
  viewClient,
  deleteClient,
  updateClient,
} = require("../controllers/clientController");
const image = upload.fields([{ name: "image", maxCount: 1 }]);
const router = express.Router();

router.get("/login", login);
router.post("/createUser", createUser);
router.get("/viewUser", verifyToken, viewUser);

router.post("/createRole", createRole);
router.get("/viewRole", viewRole);
router.put("/updateRole", updateRole);

//Department
router.post("/addDepartment", addDepartment);
router.get("/viewDepartment", viewDepartment);
router.put("/updateDepartment/:departmentId", updateDepartment);
router.delete("/deleteDepartment/:departmentId", deleteDepartment);

//Holiday
router.post("/addHoliday", addHoliday);
router.get("/viewHoliday", viewHoliday);
router.put("/updateHoliday/:holidayId", updateHoliday);
router.delete("/deleteHoliday/:holidayId", deleteHoliday);

//Client
router.post("/addClient", image, createClient);
router.get("/viewClient", viewClient);
router.put("/updateClient/:clientId", updateClient);
router.delete("/deleteClient/:clientId", deleteClient);
module.exports = router;
