import Datastore from "nedb-promises";

class Orders {
  constructor(orderFilePath) {
    console.log(orderFilePath);
    this.order = orderFilePath
      ? Datastore.create({ filename: orderFilePath, autoload: true })
      : Datastore.create();
  }

  async getAllEntries() {
    try {
      const entries = await this.order.find({});
      console.log("function all() returns: ", entries);
      return entries;
    } catch (err) {
      throw err;
    }
  }

  async addEntry(order, id) {
    const entry = { order, id };
    try {
      const doc = await this.order.insert(entry);
      return doc;
    } catch (err) {
      throw err;
    }
  }

  async deleteEntry(id) {
    try {
      const doc = await this.order.remove({ _id: id }, {});
      return doc;
    } catch (err) {
      throw err;
    }
  }
}

export default Orders;
