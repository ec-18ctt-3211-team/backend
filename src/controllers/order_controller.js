class OrderController {
  constructor({createOrderService, getAllOrdersService}) {
    this.createOrderService = createOrderService;
    this.getAllOrders = getAllOrdersService;

    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
  }

  async index(req, res) {
    try {
      const params = { ...req.query }
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
}

module.exports = OrderController;
