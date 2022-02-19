const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15
    },
    age: {
        type: Number,
        required: false,
        min: 13
    }
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
