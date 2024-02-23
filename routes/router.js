const express = require('express');
const { verifyToken } = require('../middleware/checkAuth');
const { login, createUser, viewUser, updateUser, deleteUser } = require('../controllers/userController');
const { createRole, viewRole, updateRole, deleteRole } = require('../controllers/roleController');
const { createPayslip, viewPayslip, updatePayslip, deletePayslip } = require('../controllers/payslipController');
const { createProject, viewProject, updateProject, deleteProject } = require('../controllers/projectController');
const {addDepartment,viewDepartment,updateDepartment,deleteDepartment,} = require("../controllers/department");
const {addHoliday,updateHoliday,viewHoliday,deleteHoliday,} = require("../controllers/hoilidayController");
const {createClient,viewClient,deleteClient,updateClient,} = require("../controllers/clientController");
const upload = require("../middleware/multer");
const image = upload.fields([{ name: "image", maxCount: 1 }]);
const router = express.Router();

router.get('/login', login);
router.post('/createUser', createUser);
router.get('/viewUser',verifyToken,  viewUser);
router.put('/updateUser', updateUser);
router.delete('/deleteUser', deleteUser);

router.post('/createRole', createRole);
router.get('/viewRole', viewRole);
router.put('/updateRole', updateRole);
router.delete('/deleteRole', deleteRole);

router.post('/createPayslip', createPayslip);
router.get('/viewPayslip', viewPayslip);
router.put('/updatePayslip', updatePayslip);
router.delete('/deletePayslip', deletePayslip);

router.post('/createProject', createProject);
router.get('/viewProject', viewProject);
router.put('/updateProject', updateProject);
router.delete('/deleteProject', deleteProject);

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