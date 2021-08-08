class OrderController {
  constructor({ createOrderService, getAllOrdersService, updateOrderService }) {
    this.createOrderService = createOrderService;
    this.getAllOrders = getAllOrdersService;
    this.updateOrderService = updateOrderService;

    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  async index(req, res) {
    try {
      const params = { ...req.query, ...req.params }
      const serviceResult = await this.getAllOrders.execute(params);
      if (serviceResult.failure) throw new Error(serviceResult.message);
      res.status(200).send({
        valid: true,
        orders: serviceResult.orders,
        total: serviceResult.total
      })
    } catch(err) {
      res.status(400).send({ valid: false, message: err.message })
    }
  }

  async create(req, res) {
    try {
      const params = { ...req.body };
      const serviceResult = await this.createOrderService.execute(params);
      if (serviceResult.failure) throw new Error(serviceResult.message)
      res.status(200).send({ valid: true, newOrder: serviceResult.newOrder })
    } catch(err) {
      res.status(400).send({ valid: false, message: err.message })
    }
  }

  async update(req, res) {
    try {
      const params = { ...req.params, ...req.body };
      const serviceResult = await this.updateOrderService.execute(params);
      if (serviceResult.failure) throw new Error(serviceResult.message)
      res.status(200).send({ valid: true, updatedOrder: serviceResult.updatedOrder })
    } catch (err) {
      res.status(400).send({ valid: false, message: err.message })
    }
  }
}

module.exports = OrderController;
