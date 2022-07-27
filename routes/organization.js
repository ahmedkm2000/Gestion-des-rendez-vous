const express = require('express');
const router = express.Router();

const {getAllOrganizations,getOrganizationById,addOrganization,updateOrganization,deleteOrganization,addAdminToOrganizations,addUsersToOrganization} = require('../controllers/organization');

router.get('/',getAllOrganizations);
router.get('/:id',getOrganizationById);
router.post('/',addOrganization);
router.put('/:id',updateOrganization);
router.delete('/:id',deleteOrganization);
router.post('/add/:id',addAdminToOrganizations)
router.post('/add/users/:id',addUsersToOrganization)


module.exports = router