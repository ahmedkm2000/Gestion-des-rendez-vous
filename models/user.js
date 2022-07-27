const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String},
  adresse: {type: String, required: true},
  phoneNumber: {type: String, required: true, unique: true},
  isSuperAdmin :{type:Boolean,default:false},
  roles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}],
  organizations: [{
    organization:{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization'},
    roles:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Role'}]
  }]

})
module.exports = mongoose.model('User', userSchema);