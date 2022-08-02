const mongoose = require('mongoose');

const unavailabilitySchema = mongoose.Schema({
    startDate:{
        year:{ type: Number, required: true},
        month :{ type: Number, required: true},
        day:{ type: Number, required: true},
        hour:{ type: Number, required: true},
        minute:{ type: Number, required: true}
    },
    endDate:{
        year:{ type: Number, required: true},
        month :{ type: Number, required: true},
        day:{ type: Number, required: true},
        hour:{ type: Number, required: true},
        minute:{ type: Number, required: true}
    },
    periods:[{
        startTime:{
            hour:{ type: Number, required: true},
            minute:{ type: Number, required: true}
        },
        endTime:{
            hour:{ type: Number, required: true},
            minute:{ type: Number, required: true}
        }
    }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    organizations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization'}]

});

module.exports = mongoose.model('Unavailability', unavailabilitySchema);
