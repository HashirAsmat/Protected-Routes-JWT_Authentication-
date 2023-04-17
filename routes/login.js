const express = require('express');
const {Router}= express;
const router = Router();
const controller = require("../controllers/login")

router.get('/',controller.get)
router.post('/',controller.post);
module.exports = router;
