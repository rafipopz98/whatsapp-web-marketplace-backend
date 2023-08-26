const UserModel = require('../Models/User')

class UserRepository {
    
    async CreateUser({phoneNumber, password}){
        try{
            console.log({phoneNumber, password})
            const user= new UserModel({phoneNumber, password});
            await user.save();
            
            console.log("user create!", user.phoneNumber)
            const data = {phoneNumber: user.phoneNumber, _id: user._id}
            return {created: true, data, message: "Successfully Created"};

        }catch(e){
            if(e.code == 11000){
                console.log("Username Already Exists")
                return {created: false, data: null, message: "Username Already Exists"};
            }
            console.log("Error while creating user", e)
            return {created: false, data: null, message: e.message};
        }
    }

    async GetPasswordWithPhoneNumber({phoneNumber, password}){
        try{
            const data = await UserModel.findOne({phoneNumber}).select("password _id");
            if(data){
                const userIsValid = data.password === password;
                if(userIsValid)
                    return {err: false, data, message: "Authenticated" };
                else 
                    return {err: true, data: null, message: "Username/Password Incorrect"}
            }else{             
                return {err: true, data: null, message: "username not found"};
            }
        }catch(e){
            console.log("Error at the repository layer: ", e);
            return {err: true,data: null, message: e.message}
        }
    }

    async GetUserWithPhoneNumber({phoneNumber, _id}){
        try{
            let user = await UserModel.findOne({ phoneNumber, _id }).select("-password").lean();
            if(user)
                return {err: false, userExists: true, data:{phoneNumber: user.phoneNumber, _id:user._id, libraries:user.libraries, roles: user.roles}, message: "Successfully Retrived details"};
            else
                throw {message: 'user does not exits'};
        }catch(e){
            console.log("Error at the repository layer: ", e);
            return {err: true, userExists: false, data: null, message: e.message};
        }
    }


    async GetALLUsers() {
        try{
            const users = await UserModel.find({});
            return {success: true, data: users, error: null};
        }catch(e){
            console.log("Error at the User Repository layer", e);
            return {success: false, data: null, error: e}
        }
    }
}   

module.exports = {UserRepository}