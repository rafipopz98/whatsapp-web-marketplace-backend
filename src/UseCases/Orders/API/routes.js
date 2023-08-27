const express =require("express");
const router = express.Router();

const {ProductRepository} = require("../../Products/Repository/Products");
const PR = new ProductRepository();

const {OrderRepository} = require("../Repository/OrderRepo");
const OR = new OrderRepository();

const {OrderService} = require("../services/Orderservice");
const service = new OrderService(OR, PR);


router.post("/create", async(req, res)=>{
    try{
        const {products, buyer, marketPlaceID} = req.body;
        console.log(req.body, ";;;;;;")
        const data = await service.CreateOrder({products, buyer, marketPlaceID});
        if(data.success) return res.status(200).json(data);
        res.status(500).json(data)
    }catch(e) {
        console.log("error while handling create order", e);
        return {success: false, data: null, error: e};
    }
})

module.exports = router;