const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/user.js');
const Organization = require('../models/organization.js');

const getAllUsers = (req,res,next)=>{
      User.find().populate('roles').populate('organizations').populate('organizations.organization').populate('organizations.roles')
     .then(users => res.status(200).json(users))
     .catch(error => res.status(400).json({ error }));
}

const getUserById = (req,res,next)=>{
         User.findOne({_id:req.params.id}).populate('roles').populate('organizations').populate('organizations.organization').populate('organizations.roles')
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
}

const getUserByEmail = (req,res,next)=>{
    User.findOne({email:req.params.email}).populate('roles').populate('organizations').populate('organizations.organization').populate('organizations.roles')
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
}


const addUser  = (req,res,next) =>{
const user = new User ({
        ...req.body
       });
          user.save()
         .then(() => res.status(200).json({ message: 'User has been registered successfully !'}))
         .catch(error => res.status(400).json({ error }));
};
const updateUser  = (req,res,next) => {
         User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
         .then(() => res.status(200).json({ message: 'User has been updated successfully!'}))
         .catch(error => res.status(400).json({ error }));
              
};

const deleteUser  = (req,res,next)=>{
       User.deleteOne({_id:req.params.id})
       .then(() => res.status(200).json({ message: 'User has been deleted successfully !'}))
       .catch(error => res.status(400).json({ error }));
 
};

const signUp = (req,res,next) => {
        bcrypt.hash(req.body.password,10)
        .then(password => {
            const user = new User({
               ...req.body,
               password:password
            });
            user.save()
            .then(()=>{
                res.status(200).json({message:"success"})
            })
            .catch(error =>{
                res.status(501).json({error})
            });
        })
        .catch(error => {
            res.status(501).json({error})
        });
       
};
const login = (req,res,next) => {
        User.findOne({email:req.body.email}).populate('roles').populate('organizations').populate('organizations.organization').populate('organizations.roles')
        .then(user=>{
           if(!user){
               return res.status(501).json({message:"email is incorrect"})
           }
           bcrypt.compare(req.body.password,user.password)
           .then(valid=>{
              if(!valid){
                   res.status(501).json({message:"password is incorrect"})
                }else{
               
                   res.status(200).json({
                       message:"login success",
                       data:user,
                       token:jwt.sign(
                           { userId:user._id },
                           "SECRETKEY",
                           {expiresIn:'365d'}
                           )
               })
                }
              })
           })
           .catch(error =>{
               res.status(501).json({error})
            })
        .catch(error =>{
           res.status(501).json({error})
        })
   }
const addOrganizationToUser = async (req,res,next)=>{
    const {id} = req.params;
    const {roles} = req.body;
    const {idOrg} = req.body;
    Organization.findOne({_id:idOrg}).populate('users').then((organization)=>{
        for(let i = 0;i< organization.users.length;i++){
            if(organization.users[i]._id.equals(id)){
            }

        }
    })
    User.findOne({_id:id}).populate('roles').populate('organizations').populate('organizations.organization').populate('organizations.roles').then((user)=>{
        for(let i = 0;i< user.organizations.length;i++){
            console.log(user.organizations[i].organization._id ===idOrg)
            if(user.organizations[i].organization._id ===idOrg){

            }else{

            }
        }
    })
    /*for (let i = 0 ; i< ids.length ; i++){
        await Organization.updateOne({ _id: ids[i] }, {$push: { "users": id}})
            .then(() => console.log("success"))
            .catch(error => res.status(400).json({ error }));
    }*/
}

    





module.exports = {getAllUsers,getUserById,getUserByEmail,addUser,updateUser,deleteUser,signUp,login,addOrganizationToUser }