const mongoose = require('mongoose');

const bookingsSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        trim: true

    },
    startsAt: {
        type: Date,
        required: true,
        trim: true
    }
}, {timestamps: true});

const Booking = mongoose.model('Booking', bookingsSchema);
module.exports = Booking;