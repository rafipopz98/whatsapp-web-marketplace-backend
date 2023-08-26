const express = require("express");
const router = express.Router();

const {ProductRepository} = require("../../Products/Repository/Products");
const PR = new ProductRepository();
const {MarketPlaceRepository} = require("../Repository/MarketPlace");
const MPR = new MarketPlaceRepository();

const {MarketPlaceService} = require("../services/MarketPlaceService");
const service = new MarketPlaceService(MPR, PR);

router.post("/create", async(req, res)=>{
    const {name, creator, group_id} = req.body;
    const data = await service.CreateMarketPlace({name, creator, group_id});
    console.log(data)
    if(data.success) return res.status(200).json(data);
    else return res.status(500).json(data);
})

router.post('/add-products', async(req, res)=>{
    try{
        const {products, group_id, marketPlace_id} = req.body;
        const data = await service.AddingProducts({products, group_id, marketPlace_id});
        console.log("final data", data)
        if(data.success) return res.status(200).json(data);
        return res.status(500).json(data)
    }catch(e){
        console.log("Error while handling add-products", e);
        return res.status(500).json({success: false, data: null, error: e});
    }
})

router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const data = await service.GetMarketPlace({id});
        if(data.success) return res.status(200).json(data);
        return res.status(500).json(data);
    }catch(e){
        console.log("Error while handling get market place request", e);
        return res.status(500).json({success: false, data: null, error: e})
    }
})

module.exports = router;