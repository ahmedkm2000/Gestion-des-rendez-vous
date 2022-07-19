const express = require('express');
const router = express.Router();
const {getAllRoles,getRoleById,addRole,updateRole,deleteRole} = require('../controllers/role');

router.get('/',getAllRoles);
router.get('/:id',getRoleById);
router.post('/',addRole);
router.put('/:id',updateRole);
router.delete('/:id',deleteRole);



module.exports = router