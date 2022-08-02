const express = require('express');
const router = express.Router();
const {getAllUsers,getUserById,getUserByEmail,addUser,updateUser,deleteUser,signUp,login,addOrganizationToUser} = require('../controllers/user');


router.get('/',getAllUsers);
router.get('/:id',getUserById);
router.get('/email/:email',getUserByEmail);
router.post('/',addUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
router.post('/signup',signUp);
router.post('/login',login);
router.post('/organizations/add/:id',addOrganizationToUser);

module.exports = router