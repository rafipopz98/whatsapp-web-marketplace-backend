class UserService{
     repository;
    constructor(UR){
        this.repository =  UR;
    }
    
    async SignUp({phoneNumber, password}){
        try{
            const data = await this.repository.CreateUser({phoneNumber, password});
            console.log("User Created: ", data.data)

            if(data.created){
                return {success: true, message: "User Created", data: data.data};
            }
            return {success: false, message: 'phoneNumber Already Exists', data: null}; 
        }catch(e){
            console.log("Error at Customer Service Layer", e);
            return {success: false,  message: 'Server Error', data: null}; 
        }
    }

    async GetAllUsers(){
        try{
            return this.repository.GetALLUsers();
        }catch(e){
            console.log("Error at user service layer", e);
            return {success: false, data: null, error: e};
        }
    }

    async Login({phoneNumber, password}){
        try{
            return this.repository.GetPasswordWithPhoneNumber({phoneNumber, password})
        }catch(e){
            console.log("Error at the service layer: ", e);
            return {success: true, data:null, error: e};
        }
    }


    async GetUser({phoneNumber, _id}){
        try{
            return this.repository.GetUserWithPhoneNumber({phoneNumber, _id});
        }catch(e){
            console.log("Error at service layer", e);
            return {err: true, userfound: false, message: "Error", data: false};
        }
    }
}

module.exports = {UserService};