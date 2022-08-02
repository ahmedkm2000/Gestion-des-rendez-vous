const express = require('express');
const router = express.Router();
const {getAllRoles,getRoleById,getRoleByName,addRole,updateRole,deleteRole} = require('../controllers/role');


router.get('/',getAllRoles);
router.get('/:id',getRoleById);
router.get('/get',getRoleByName);
router.post('/',addRole);
router.put('/:id',updateRole);
router.delete('/:id',deleteRole);



module.exports = router