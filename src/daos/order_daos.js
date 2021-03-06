class OrderDaos {
  constructor({ orderModel }) {
    this.orderModel = orderModel;

    this.getAll = this.getAll.bind(this);
    this.getAllByCustomerId = this.getAllByCustomerId.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  async getAll(host_id, config = {}) {
    try {
      const { limit, page } = config;
      const skipRows = limit * (page - 1);
      let orders;
      if (limit != NaN && page != NaN) {
        orders = await this.orderModel
          .find({ host_id })
          .limit(limit)
          .skip(skipRows);
      } else {
        orders = this.orderModel.find({ host_id });
      }
      const total = await this.orderModel.countDocuments({ host_id });
      return { orders, total };
    } catch (err) {
      return { failure: true, message: err.message || "Something went wrong" };
    }
  }

  async getAllByCustomerId(customer_id, config = {}) {
    try {
      const { limit, page } = config;
      const skipRows = limit * (page - 1)
      let orders;
      if (limit != NaN && page != NaN) {
        orders = await this.orderModel
          .find({ customer_id })
          .limit(limit)
          .skip(skipRows);
      } else {
        orders = this.orderModel.find({ customer_id })
      }
      const total = await this.orderModel.countDocuments({ customer_id })
      return { orders, total }
    } catch (err) {
      return { failure: true, message: err.message || "Something went wrong" };
    }
  }

  async getById(id) {
    try {
      const order = await this.orderModel.findById(id);
      return { order };
    } catch (err) {
      return { failure: true, message: err.message || "Something went wrong" };
    }
  }

  async create(params) {
    try {
      const newOrder = await this.orderModel.insertMany(params);
      if (!newOrder) throw new Error("Create order failed");
      return { newOrder: newOrder[0] };
    } catch (err) {
      return { failure: true, message: err.message };
    }
  }

  async update(params) {
    try {
      const { id, status } = params;
      const updatedOrder = await this.orderModel.findByIdAndUpdate(
        id, { status: status }, { new: true }
      );
      return { updatedOrder };
    } catch (err) {
      return { failure: true, message: err.message };
    }
  }
}

module.exports = OrderDaos;