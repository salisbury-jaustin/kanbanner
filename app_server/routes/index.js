const express = require('express');
const router = express.Router();
const ctrlIndex= require('../controllers/index');

/* GET home page. */
router.get('/', ctrlIndex.userBoard);
router .post('/addList', ctrlIndex.addList);
router .post('/addItem', ctrlIndex.addItem);
router .post('/deleteList', ctrlIndex.delList);
router .post('/deleteItem', ctrlIndex.delItem);

module.exports = router;
