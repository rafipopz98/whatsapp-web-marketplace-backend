class MarketPlaceService {
    marketPlaceRepo
    productRepo
    constructor(MPR, PR){
        this.marketPlaceRepo = MPR;
        this.productRepo = PR;
    }

    async GetMarketPlace({id}) {
        try{
            return this.marketPlaceRepo.GetMarketPlace({id});
        }catch(e) {
            console.log("Error at Market Place Repository layer", e);
            return {success: false, data: null, error: e};
        }
    }

    async CreateMarketPlace({name, creator, group_id}){
        try{
            const data = await this.marketPlaceRepo.CreateMarketPlace({name, creator, group_id});
            return data;
        }catch(e){
            console.log("Error at Market Place Service Layer",e);
            return {success: false, data: null, error: e};
        }
    }

    async AddingProducts({products, group_id, marketPlace_id}){
        try {
            const productData = await this.productRepo.addMultipleProducts({products, group_id, marketPlace_id});
            let marketPlaceData;
            if( productData.success){
                marketPlaceData = await this.marketPlaceRepo.addMultipleProducts({products: productData.data, group_id, marketPlace_id});
                return marketPlaceData;
            }
            return {success: false, data: null, error: null}
        } catch (e) {
            console.log("Error at Market Place Service Layer",e)
            return {success: false, data: null, error: e};
        }
    }
}

module.exports = {MarketPlaceService};