const OrdersModel = require("../Models/Order");


class OrderRepository {
    async CreateOrder({products, buyer, marketPlaceID}){
        try {
            console.log(products, buyer, marketPlaceID, "Stuff before hitting the DB")
            const order = new OrdersModel({products, buyer, marketPlaceID});
            await order.save();
            return {success: true, data: order, error: null}
        } catch (e) {
            console.log("Error at Order Repository Layer", e);
            return {success: false, data: null, error: e};
        }
    }
}

module.exports = {OrderRepository}