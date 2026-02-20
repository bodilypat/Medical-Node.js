//models/Word.js

const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
    bed_number: String,
    is_occupied: { 
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const wardSchema = new mongoose.Schema({
    ward_name: String,
    capacity: Number,
    beds: [bedSchema]
}, { timestamps: true });

module.exports = mongoose.model('Ward', wardSchema);
