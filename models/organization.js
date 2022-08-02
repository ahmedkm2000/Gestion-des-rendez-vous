const mongoose = require('mongoose');

const organizationSchema = mongoose.Schema({
  name: { type: String, required: true},
  description: { type: String, required: true},
  isActive:{type:Boolean},
  adresse :{ type: String, required: true},
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  unavailability:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Unavailability'}]
});

module.exports = mongoose.model('Organization', organizationSchema);
