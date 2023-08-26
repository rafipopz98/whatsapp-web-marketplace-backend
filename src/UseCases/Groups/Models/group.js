const {Schema, model} = require("mongoose");

const groupSchema = new Schema({
    name: {
        type: String,
        require: true, 
    },
    creator: { type: Schema.Types.ObjectId, ref: 'user' },
    admins: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    marketPlace:{
        type: Boolean,
        default: false,
    }, 
    members: [{ type: Schema.Types.ObjectId, ref: 'user' }],
})

module.exports = model('group', groupSchema);