class OrderService {
    OrdersRepo
    ProductsRepo
    constructor(OR, PR){
        this.OrdersRepo = OR
        this.ProductsRepo = PR
    }

    async CreateOrder({products, buyer, marketPlaceID}){
        try {
            let data = await this.OrdersRepo.CreateOrder({products, buyer, marketPlaceID});

            if(data.success)
             data = await this.ProductsRepo.DecreaseQuantity({product: products[0]});
            return data;
        }catch (e) {
            console.log("Error at order Service layer", e);
            return {success: false, data: null, error: e};            
        }
    }
}

module.exports = {OrderService}