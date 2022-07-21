const Organization = require('../models/organization.js');
const User = require('../models/user.js');
const Role = require('../models/role.js');
const getAllOrganizations = (req,res,next)=>{
      Organization.find().populate('users')
     .then(organizations => res.status(200).json(organizations))
     .catch(error => res.status(400).json({ error }));
}

const getOrganizationById = (req,res,next)=>{
        Organization.findOne({_id:req.params.id}).populate('users')
        .then(organization => res.status(200).json(organization))
        .catch(error => res.status(400).json({ error }));
}

const addOrganization = (req,res,next) =>{
const organization = new Organization({
        ...req.body
       });
          organization.save()
         .then(() => res.status(200).json({ message: 'organization has been registered successfully !'}))
         .catch(error => res.status(400).json({ error }));
};
const updateOrganization = (req,res,next) => {
          Organization.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
         .then(() => res.status(200).json({ message: 'organization has been updated successfully !'}))
         .catch(error => res.status(400).json({ error }));
              
};

const deleteOrganization = (req,res,next)=>{
       Organization.deleteOne({_id:req.params.id})
       .then(() => res.status(200).json({ message: 'organization has been deleted successfully !'}))
       .catch(error => res.status(400).json({ error }));
 
}
const  addProfessionalToOrganization = async (req,res,next)=>{
    const {idOrganization} = req.body;
    const {idProfessional} = req.body;
    var idRole;
   await Role.findOne({name:"admin"})
        .then(role => idRole = role._id)
        .catch(error => console.log(error));
   await User.updateOne({ _id: idProfessional }, {$push: { "organizations": {organization:idOrganization,roles:[idRole]}}})
        .then(() => res.status(200).json({ message: 'Professional has been added successfully !'}))
        .catch(error => res.status(400).json({ error }));
}

module.exports = {getAllOrganizations,getOrganizationById,addOrganization,updateOrganization,deleteOrganization,addProfessionalToOrganization}