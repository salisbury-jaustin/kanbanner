const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user');

router 
    .route('/user/:user/:password') 
    .get(ctrlUser.getUser); 
router 
    .route('/user')
    .post(ctrlUser.createUser)
    .put(ctrlUser.editUser)
router 
    .route('/checkUser/:user')
    .get(ctrlUser.checkUsername)
router 
    .route('/list')
    .post(ctrlUser.createLists)
router 
    .route('/removeList')
    .post(ctrlUser.removeList)
router 
    .route('/addItem')
    .post(ctrlUser.addItem)
router 
    .route('/removeItem')
    .post(ctrlUser.removeItem)
router
    .route('/editItem')
    .put(ctrlUser.editItem)
router 
    .route('/moveItem')
    .put(ctrlUser.moveItem)
module.exports = router;

