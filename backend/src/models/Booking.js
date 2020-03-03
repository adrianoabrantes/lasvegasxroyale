const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    date: String,
    approved: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'spot'
    }
});

module.exports = mongoose.model('Booking', BookingSchema);