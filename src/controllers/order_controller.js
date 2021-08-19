class OrderController {
  constructor({
    createOrderService,
    getAllOrdersService,
    getAllOrdersByCustomerIdService,
    getOrderByIdService,
    updateOrderService
  }) {
    this.createOrderService = createOrderService;
    this.getAllOrders = getAllOrdersService;
    this.getAllOrdersByCustomerIdService = getAllOrdersByCustomerIdService;
    this.getOrderByIdService = getOrderByIdService;
    this.updateOrderService = updateOrderService;

    this.index = this.index.bind(this);
    this.indexCustomer = this.indexCustomer.bind(this);
    this.show = this.show.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  async index(req, res) {
    try {
      const params = { ...req.query, ...req.params };
      const serviceResult = await this.getAllOrders.execute(params);
      if (serviceResult.failure) throw new Error(serviceResult.message);
      res.status(200).send({
        valid: true,
        orders: serviceResult.orders,
        total: serviceResult.total,
      });
    } catch (err) {
      res.status(400).send({ valid: false, message: err.message });
    }
  }

  async indexCustomer(req, res) {
    try {
      const params = req.params;
      const query = { ...req.query };
      const serviceResult = await this.getAllOrdersByCustomerIdService.execute(params, query);
      if (serviceResult.failure) throw new Error(serviceResult.message);
      res.status(200).send({
        valid: true,
        orders: serviceResult.orders,
        total: serviceResult.total
      })
    } catch (err) {
      res.status(400).send({ valid: false, message: err.message })
    }
  }

  async show(req, res) {
    try {
      const params = { ...req.params };
      const serviceResult = await this.getOrderByIdService.execute(params);
      if (serviceResult.failure) throw new Error(serviceResult.message);
      res.status(200).send({
        valid: true,
        order: serviceResult.order,
      });
    } catch (err) {
      res.status(400).send({ valid: false, message: err.message });
    }
  }

  async create(req, res) {
    try {
      const params = { ...req.body };
      const serviceResult = await this.createOrderService.execute(params);
      if (serviceResult.failure) throw new Error(serviceResult.message);
      res.status(200).send({ valid: true, newOrder: serviceResult.newOrder });
    } catch (err) {
      res.status(400).send({ valid: false, message: err.message });
    }
  }

  async update(req, res) {
    try {
      const params = { ...req.params, ...req.body };
      const serviceResult = await this.updateOrderService.execute(params);
      if (serviceResult.failure) throw new Error(serviceResult.message);
      res
        .status(200)
        .send({ valid: true, updatedOrder: serviceResult.updatedOrder });
    } catch (err) {
      res.status(400).send({ valid: false, message: err.message });
    }
  }
}

module.exports = OrderController;
