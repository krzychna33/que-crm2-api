const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const { authenticate } = require('../middleware/authenticate');
const { checkPermissions } = require('../middleware/checkPermissions');

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/me', authenticate, userController.getUser);
router.delete('/logout', authenticate, userController.logOut);

router.delete('/delete-user/:id', [authenticate, checkPermissions('admin')], userController.deleteUser);
module.exports = router;