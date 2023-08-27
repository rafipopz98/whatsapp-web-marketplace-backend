const express = require("express");
const router = express.Router();

const {GroupRepository} = require("../Repository/GroupRepo");
const GroupRepo = new GroupRepository();

const {GroupService} = require("../Services/groupService");
const service = new GroupService(GroupRepo);

router.post("/create", async(req, res)=>{
    try {
        console.log("hiiht", typeof req.body.members, req.body)
        const {creator, name, marketPlace, members} = req.body;
        const data = await service.CreateGroup({creator, name, marketPlace, members});
        if(data.success) return res.status(200).json(data)
        else return res.status(500).json(data); 
    } catch (e) {
        console.log("Error while handling create group", e);
        return res.json({success: false, data: null, error:e})
    }
})

router.get("/:phoneNumber", async (req, res) =>{
    try{
        const {phoneNumber} = req.params;
        const data = await service.GetGroupWithPhoneNumber({phoneNumber});
        if(data.success) return res.status(200).json(data)
        else return res.status(500).json(data)
    }catch(e){
        console.log("Error while Handling get Groups of a phone number", e);
        return res.status(500).json({success: false, data: null, error: e});
    }
})

router.post("/make-admin", async(req, res)=>{
    try{
        console.log("hit2")
        const {group_id, admins} = req.body;
        const data = await service.MakeAdmins({group_id, admins});
        if(data.success) return res.status(200).json(data)
        else return res.status(500).json(data); 
    }catch(e){
        console.log("Error while handling make-admin request", e);
        return res.status(500).json({success: false, error: e, data:null})
    }
})

module.exports = router;