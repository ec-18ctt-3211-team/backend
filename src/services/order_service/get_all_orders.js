class GetAllOrders {
  constructor({ orderDaos }) {
    this.orderDaos = orderDaos;
  }
  async execute(params) {
    try {
      const { limit, page } = params
      const orders = await this.orderDaos.getAll({ limit: parseInt(limit), page: parseInt(page) });
      if (!orders) throw new Error("orders not found");
      return orders;
    } catch (error) {
      return { failure: true, message: error,message };
    }
  }
}

module.exports = GetAllOrders; 
