const Organization = require('../models/organization.js');
const User = require('../models/user.js');
const Role = require('../models/role.js');


const getAllOrganizations = (req,res,next)=>{
      Organization.find().populate('users')
     .then(organizations => res.status(200).json(organizations))
     .catch(error => res.status(400).json({ error }));
}

const getOrganizationById = (req,res,next)=>{
        Organization.findOne({_id:req.params.id}).populate({
        path: 'unavailability',
        populate: [{
            path: 'users',
            model: 'User'
        }
        ]
    }).populate('users')
        .then(organization => res.status(200).json(organization))
        .catch(error => res.status(400).json({ error }));
}

const getOrganizationByName = (req,res,next)=>{
    Organization.findOne({name:req.params.name}).populate('users')
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

const  addAdminToOrganizations = async (req,res,next)=>{
    const {id} = req.params;
    const idsOrg = req.body;
    var idRole;
    var organizations = []
    await Role.findOne({name:"admin"})
        .then(role => idRole = role._id)
        .catch(error => console.log(error));
    for (let i = 0 ; i< idsOrg.length ; i++){
        organizations.push({
            organization:idsOrg[i].value,
            roles:[idRole]
        })
    }
    await User.updateOne({ _id: id }, {$push: { "organizations": {$each:organizations}}})
        .then(() => res.status(200).json({ message: 'Admin has been added successfully !'}))
        .catch(error => res.status(400).json({ error }));
}
const addUsersToOrganization = async (req,res,next)=>{
      const {id} = req.params;
      const ids = req.body;
      console.log(ids)
      console.log(id)
      for (let i = 0 ; i< ids.length ; i++){
      await Organization.updateOne({ _id: ids[i] }, {$push: { "users": id}})
        .then(() => console.log("success"))
        .catch(error => res.status(400).json({ error }));
}
}


module.exports = {getAllOrganizations,getOrganizationById,getOrganizationByName,addOrganization,updateOrganization,deleteOrganization,addAdminToOrganizations,addUsersToOrganization}