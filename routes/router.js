const express = require('express');
const { verifyToken } = require('../middleware/checkAuth');
const { login, createUser, viewUser } = require('../controllers/userController');
const { createRole, viewRole, updateRole } = require('../controllers/roleController');
const { createPayslip, viewPayslip, updatePayslip } = require('../controllers/payslipController');
const router = express.Router();

router.get('/login', login)
router.post('/createUser', createUser)
router.get('/viewUser',verifyToken,  viewUser)

router.post('/createRole', createRole);
router.get('/viewRole', viewRole);
router.put('/updateRole', updateRole);

router.post('/createPayslip', createPayslip);
router.get('/viewPayslip', viewPayslip);
router.put('/updatePayslip', updatePayslip);

module.exports = router