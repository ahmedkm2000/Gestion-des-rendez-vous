const mongoose = require('mongoose');

const organizationSchema = mongoose.Schema({
  name: { type: String, required: true},
  description: { type: String, required: true},
  adresse :{ type: String, required: true},
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Organization', organizationSchema);
