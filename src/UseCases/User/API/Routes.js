const express = require("express");
const router = express.Router();

const {UserService} = require('../Services/userService')
const {UserRepository} = require('../Repository/userRepo');
const repo = new UserRepository()
const service = new UserService(repo);

router.post("/signup", async (req, res)=>{
    try{
        const {phoneNumber, password} = req.body;
        const data = await service.SignUp({phoneNumber, password});
        if(data.created)
            return res.status(200).json(data);
        res.status(422).json({data});
    }catch(e){
        console.log("Error at api layer", e);
        return res.status(422).json({message: "Username already exists"})
    }
})


router.post("/login",  async(req, res)=>{
    try{
        const {phoneNumber, password} = req.body;
        const data = await service.Login({phoneNumber, password});
        
        if(data.data) return res.status(200).json({message: "Logged In Successfully", success: true});

            let statusCode = 200;    
            if(data.err){
                switch(data.message){
                    case "Server Error": statusCode=503;
                    break;
                    case "phoneNumber not found": statusCode=404;
                    console.log("phoneNumber not found at api layer")
                    break;
                    case "phoneNumber/Password Incorrect":
                        statusCode = 401;
                        break;
                }
                return res.status(statusCode).json({success: false, message: data.message})
        }
    }catch(e){
        console.log("Error at the API Layer: ", e);
        return res.json({status: 503, request: false, message: "Server Error"})
    }
})

module.exports = router;