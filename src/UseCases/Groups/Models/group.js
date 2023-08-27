const {Schema, model} = require("mongoose");

const groupSchema = new Schema({
    name: {
        type: String,
        require: true, 
    },
    creator: {type: Number, required: true},
    admins: [{ type: Number, required: true}],
    marketPlace:{
        type: Boolean,
        default: false,
    }, 
    members: [{type: Number}],
})

module.exports = model('group', groupSchema);