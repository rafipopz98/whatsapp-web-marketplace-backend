const ProductModel = require("../Models/Products")

class ProductRepository {
    async addMultipleProducts({products, group_id, marketPlace_id}) {
        try{
            console.log(marketPlace_id, group_id, products, "}}}}}}}}}}}}}}}}}}}}}]]")
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

    async DecreaseQuantity({product}){
        try{
            console.log("inside DecreaseQuantity", product)
            const productData = await ProductModel.findById(product._id);
            console.log("#############", productData)
            if(productData){
                productData.quantity--;
                productData.save()
                if(productData.quantity <= 0) await ProductModel.findOneAndDelete({_id:productData._id});  
                return {success: true, data: productData, error: null};
            }
            return {success: false, data: null, error: "Product not found"}
        }catch(e){
            console.log("Error at Products Repository Layer", e);
            return {success: false, data: null, error: e};
        }
    }
}

module.exports = {ProductRepository};