const mongoose = require('mongoose');


const TodoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        index: true,
        minlength: 5,
        maxlength: 20
    },
    status: {
        type: String,
        required: false,
        default: 'to-do'
    }
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Todo', TodoSchema);
