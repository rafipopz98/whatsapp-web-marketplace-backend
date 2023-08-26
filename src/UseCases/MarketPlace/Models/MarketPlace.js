const {Schema, model} = require("mongoose");

const marketPlaceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true,
    },
    groupID: {
        type: String,
        required: true,
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }]
})

module.exports = model("marketplace", marketPlaceSchema);