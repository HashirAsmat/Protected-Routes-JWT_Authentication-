const express = require('express');
const router = express.Router();
const controller =require('../controllers/contr')


router.post('/', controller.post)


//you have to be careful putting the route that is using a param after the regular route that worked for me.
router.get('/getAll', controller.getAll)
router.get('/:id', controller.get)


router.put('/:id',controller.update)
router.delete('/:id',controller.Delete)
module.exports = router;
