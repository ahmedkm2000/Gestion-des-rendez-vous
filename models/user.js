const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  email: { type: String, required: true, unique:true },
  password: { type: String},
  adresse: { type: String, required: true},
  phoneNumber: { type: String, required: true, unique:true },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role'}],
  organizations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization'}]

});

module.exports = mongoose.model('User', userSchema);