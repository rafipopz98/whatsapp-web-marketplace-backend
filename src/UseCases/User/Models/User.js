const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    phoneNumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    groups: [{ type: Schema.Types.ObjectId, ref: 'group' }]
})

module.exports = model('User', userSchema);