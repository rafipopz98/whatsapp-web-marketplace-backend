const {Schema, model} = require("mongoose");

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
         require: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    marketPlaceID: {
        type: Schema.Types.ObjectId,
        ref: 'marketplace',
        required: true,
    },
    groupID: {
        type: Schema.Types.ObjectId, 
        ref: 'group',
        required: true,
    }

})

module.exports = model("product", productSchema);