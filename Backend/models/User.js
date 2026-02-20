//models/User.js (Authentication + RBAC)

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: String,
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    is_active: {
        type: Boolean,
        default: true
    },
    last_login: Date,
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);

