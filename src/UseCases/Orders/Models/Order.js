const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
    products: [{ type: Schema.Types.ObjectId, ref: 'product', required: true }],
    buyer: { type: Schema.Types.ObjectId, ref: 'user', requied: true },
    marketPlaceID: { type: Schema.Types.ObjectId, ref: 'marketPlace', required: true },
    groupID: { type: Schema.Types.ObjectId, ref: 'group', requied: true }
})


module.exports = model('order', orderSchema);