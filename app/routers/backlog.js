const express = require('express');
const backlog_controller = require('../controllers/backlog.js');

const router = express.Router();

router.get("/", backlog_controller.all);
router.post("/add", backlog_controller.add);
router.put("/edit/:id", backlog_controller.edit);
router.put("/move/:id", backlog_controller.move);
router.delete("/delete/:id", backlog_controller.del);

module.exports = router;