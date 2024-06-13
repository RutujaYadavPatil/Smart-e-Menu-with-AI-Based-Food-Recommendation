const mongoose = require('mongoose');
const moment = require('moment-timezone');

const { Schema } = mongoose;

const InvoiceSchema = new Schema({
    user_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    order_data: {
        type: Array,
        required: true,
    },
    total_price: {
        type: Number,
        required: true
    },
    invoice_date: {
        type: Date,
        default: () => moment().tz('Asia/Kolkata').toDate() // Set the default date to the current date in the Indian time zone
    }
});

InvoiceSchema.index({ user_name: 1, invoice_date: -1 });
module.exports = mongoose.model('Invoice', InvoiceSchema);
