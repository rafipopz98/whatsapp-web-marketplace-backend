class GroupService {
    GR;

    constructor(GR){
        this.GR = GR; 
    }

    async CreateGroup({creator, name, marketPlace, members}) {
        try {
            return this.GR.CreateGroup({creator, name, marketPlace, members})
        } catch (e) {
            console.log("Error at GroupService Layer", e)
            return {success: false, data: null, error: e};
        }
    }

    async GetGroupWithPhoneNumber({phoneNumber}) {
        try{
            return this.GR.GetGroupWithPhoneNumber({phoneNumber});
        }catch(e) {
            console.log("Error at Group Service Layer", e);
            return {success: false, data: null, error: e}
        }
    }

    async MakeAdmins({group_id, admins}) {
        try {
            return this.GR.makeAdmins({group_id,  admins})
        } catch (e) {
            console.log("Error at GroupService Layer", e)
            return {success: false, data: null, error: e};
        }
    }
}

module.exports = {GroupService}