const express = require('express');
const router = express.Router();
const {getAllOrganizations,getOrganizationById,addOrganization,updateOrganization,deleteOrganization} = require('../controllers/organization');

router.get('/',getAllOrganizations);
router.get('/:id',getOrganizationById);
router.post('/',addOrganization);
router.put('/:id',updateOrganization);
router.delete('/:id',deleteOrganization);



module.exports = router