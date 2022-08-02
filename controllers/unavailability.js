const Unavailability = require('../models/unavailability.js');

const getAllPeriods = (req,res,next)=>{
    Unavailability.find().populate('users')
        .then(periods => res.status(200).json(periods))
        .catch(error => res.status(400).json({ error }));
}

const getPeriodById = (req,res,next)=>{
    /*var date  = new Date();
    const year = parseInt(date.getFullYear());
    const month = parseInt(date.getMonth());
    const day = parseInt(date.getDate());
    Unavailability.findOne({
        $and: [
            {
                _id:req.params.id
            },
            {
                startDate: { $elemMatch: { year: "2022"} }
            },
            {
                startDate: { $elemMatch: { month: "7"} }
            },
            {
                startDate: { $elemMatch: { day: "31"} }
            }
        ]
    })*/

    Unavailability.findOne({_id:req.params.id}).populate('users')
        .then(period => res.status(200).json(period))
        .catch(error => res.status(400).json({ error }));
}

const addPeriod = (req,res,next) =>{
    const unavailability = new Unavailability({
        ...req.body
    });
    unavailability.save()
        .then((period) => res.status(200).json({period}))
        .catch(error => res.status(400).json({ error }));
};
const updatePeriod = (req,res,next) => {
    Unavailability.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Period has been updated successfully !'}))
        .catch(error => res.status(400).json({ error }));

};

const deletePeriod = (req,res,next)=>{
    Unavailability.deleteOne({_id:req.params.id})
        .then(() => res.status(200).json({ message: 'Period has been deleted successfully !'}))
        .catch(error => res.status(400).json({ error }));

}


module.exports = {getAllPeriods,getPeriodById,addPeriod,updatePeriod,deletePeriod}