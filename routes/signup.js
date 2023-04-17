const express = require('express');
const router = express.Router();
const controller = require('../controllers/signup');

router.get('/',controller.get);

// controller.post
router.post('/',controller.post);
module.exports = router;