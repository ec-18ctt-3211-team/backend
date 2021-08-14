class CreateOrder {
  constructor({ orderDaos }) {
    this.orderDaos = orderDaos;

    this.execute = this.execute.bind(this);
  }
  async execute(params) {
    try {
      const daosResult = await this.orderDaos.create(params);
      return daosResult;
    } catch (error) {
      return { failure: true, message: error.message };
    }
  }
}

module.exports = CreateOrder;
