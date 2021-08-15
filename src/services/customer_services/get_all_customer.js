class GetAllCustomer {
  constructor({ customerDaos }) {
    this.customerDaos = customerDaos;
  }
  async execute(params) {
    try {
      const { limit, page } = params;
      const daosResult = await this.customerDaos.getAll({
        limit: parseInt(limit),
        page: parseInt(page),
      });
      if (daosResult.failure) throw new Error(daosResult.message);
      return daosResult;
    } catch (error) {
      return { failure: true, message: error.message };
    }
  }
}

module.exports = GetAllCustomer;
