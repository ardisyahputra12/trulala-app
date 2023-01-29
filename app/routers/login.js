const express = require('express');
const login_controller = require('../controllers/login.js');

const router = express.Router();

router.get("/login", login_controller.login);
router.get("/signup", login_controller.signup);
router.get("/logout", login_controller.logout);
router.post("/login", login_controller.authLogin);
router.post("/signup", login_controller.authSignup);

module.exports = router;