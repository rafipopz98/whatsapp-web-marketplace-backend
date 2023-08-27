const MarketPlaceModel = require("../Models/MarketPlace");

class MarketPlaceRepository {
  async GetMarketPlaceWithGroupID({ id }) {
    try {
      const data = await MarketPlaceModel.find({ groupID: id }).populate(
        "products"
      );
      return { success: true, data, error: null };
    } catch (e) {
      console.log("Error at Market Place Repository layer", e);
      return { success: false, data: null, error: e };
    }
  }

  async CreateMarketPlace({ name, creator, group_id }) {
    try {
      console.log("123", name, creator, group_id);
      const data = new MarketPlaceModel({ name, creator, groupID: group_id });
      await data.save();
      console.log(data);
      return { success: true, data, error: null };
    } catch (e) {
      console.log("Error at market place repository layer", e);
      return { success: false, data: null, error: e };
    }
  }

  async addMultipleProducts({ products, group_id, marketPlace_id }) {
    try {
      console.log(marketPlace_id, "*****************************888");
      const marketplace = await MarketPlaceModel.findById(marketPlace_id);
      console.log("market Place: ", marketplace);
      console.log("products: ", products);
      products.forEach((el) => {
        console.log(el);
        marketplace.products.push(el._id);
      });
      marketplace.save();
      return { success: true, data: marketplace, error: false };
    } catch (e) {
      console.log("Error at Market Place Repository layer", e);
      return { success: false, data: null, error: e };
    }
  }
}

module.exports = { MarketPlaceRepository };
