const express = require('express');
const router = express.Router();
const {getAllUsers,getUserById,addUser,updateUser,deleteUser,signUp,login} = require('../controllers/user');

router.get('/',getAllUsers);
router.get('/:id',getUserById);
router.post('/',addUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
router.post('/signup',signUp);
router.post('/login',login);



module.exports = router