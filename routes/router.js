const express = require('express');
const { verifyToken } = require('../middleware/checkAuth');
const { login, createUser, viewUser, updateUser, deleteUser } = require('../controllers/userController');
const { createRole, viewRole, updateRole, deleteRole } = require('../controllers/roleController');
const { createPayslip, viewPayslip, updatePayslip, deletePayslip } = require('../controllers/payslipController');
const { createProject, viewProject, updateProject, deleteProject } = require('../controllers/projectController');
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


module.exports = router