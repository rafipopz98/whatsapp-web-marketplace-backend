const GroupModel = require("../Models/group")
class GroupRepository {
    async CreateGroup({creator, name, marketPlace, members}){
        try{   
            console.log(members, creator);
            members.push(creator);
            const admins = [creator]
            const group = new GroupModel({creator, name, marketPlace, members, admins});
            await group.save();
            return {success: true, data: group, error: null};
        }catch(e){
            console.log("Error at Group Repository layer",e);
            return {success: false, data: null, error: e};
        }
    }

    async GetGroupWithPhoneNumber({phoneNumber}) {
        try{
            const groups = await GroupModel.find({members: phoneNumber});
            console.log("Groups:", groups);
            return {success: true, data: groups, error: null}
        }catch(e) {
            console.log("Error at Group Repository layer", e);
            return {success: false, data: null, error: e};
        }
    }

    async makeAdmins({group_id, admins}) {
        try{
            console.log("first")
            const data = await GroupModel.findOneAndUpdate({_id: group_id, members: {$ne: admins}}, {$addToSet: { members}});
            console.log(data);
            return {success: true, data, error: null};
        }catch(e){
            console.log("Error at Group Repository layer",e);
            return {success: false, data: null, error: e};
        }
    }
}

module.exports = {GroupRepository}