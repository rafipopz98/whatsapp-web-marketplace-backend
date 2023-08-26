const ProductModel = require("../Models/Products")

class ProductRepository {
    async addMultipleProducts({products, group_id, marketPlace_id}) {
        try{
            products.forEach(el => {
                el.marketPlaceID = marketPlace_id,
                el.groupID = group_id
            });
            const data = await ProductModel.create(products);
            console.log("Products after creation:", data)
            return {success: true, data: data, error: null}
        }catch(e){
            console.log("Error at product Repository layer", e);
            return {success: false, data: null, error: e};
        }
    }
}

module.exports = {ProductRepository};