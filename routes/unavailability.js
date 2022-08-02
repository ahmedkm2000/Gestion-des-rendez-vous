const express = require('express');
const router = express.Router();
const {getAllPeriods,getPeriodById,addPeriod,updatePeriod,deletePeriod} = require('../controllers/unavailability');


router.get('/',getAllPeriods);
router.get('/:id',getPeriodById);
router.post('/',addPeriod);
router.put('/:id',updatePeriod);
router.delete('/:id',deletePeriod);



module.exports = router