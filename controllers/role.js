const Role = require('../models/role.js');

const getAllRoles = (req,res,next)=>{
     Role.find()
     .then(roles => res.status(200).json(roles))
     .catch(error => res.status(400).json({ error }));
     console.log(req.auth);
}

const getRoleById = (req,res,next)=>{
        Role.findOne({_id:req.params.id})
        .then(role => res.status(200).json(role))
        .catch(error => res.status(400).json({ error }));
}
const getRoleByName = (req,res,next)=>{
    Role.findOne({name:req.query.name})
        .then(role => res.status(200).json(role))
        .catch(error => res.status(400).json({ error }));
}

const addRole = (req,res,next) =>{
const role = new Role({
        ...req.body
       });
          role.save()
         .then(() => res.status(200).json({ message: 'Role has been registered successfully !'}))
         .catch(error => res.status(400).json({ error }));
};
const updateRole = (req,res,next) => {
          Role.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
         .then(() => res.status(200).json({ message: 'Role has been updated successfully !'}))
         .catch(error => res.status(400).json({ error }));
              
};

const deleteRole = (req,res,next)=>{
       Role.deleteOne({_id:req.params.id})
       .then(() => res.status(200).json({ message: 'Role has been deleted successfully !'}))
       .catch(error => res.status(400).json({ error }));
 
}


module.exports = {getAllRoles,getRoleById,getRoleByName,addRole,updateRole,deleteRole}