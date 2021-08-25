class RoomController {
  constructor({
    getRoomsService,
    getRoomByIdService,
    getRoomsByHostService,
    createRoomsService,
    updateRoomsService,
    recommender,
    lastChoiceModel
  }) {
    this.getRoomsService = getRoomsService;
    this.getRoomByIdService = getRoomByIdService;
    this.getRoomsByHostService = getRoomsByHostService;
    this.createRoomsService = createRoomsService;
    this.updateRoomsService = updateRoomsService;
    this.recommender = recommender;
    this.lastChoiceModel = lastChoiceModel;

    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.host = this.host.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  async index(req, res) {
    try {
      const params = { ...req.query };
      const serviceResult = await this.getRoomsService.execute(params);
      if (serviceResult.failure) throw new Error(serviceResult.message);
      res.status(200).send({
        valid: true,
        rooms: serviceResult.rooms,
        total: serviceResult.total,
      });
    } catch (err) {
      res.status(400).send({ valid: false, message: err.message });
    }
  }

  async show(req, res) {
    try {
      const params = { ...req.params };
      const { customer_id } = req.query;
      const serviceResult = await this.getRoomByIdService.execute(params);
      if (serviceResult.failure) throw new Error(serviceResult.message);
      if (customer_id) {
        const result = await this.lastChoiceModel.findOneAndUpdate(
          { customer_id },
          { room_id: serviceResult.room._id }
        )
        if (!result) {
          const newChoice = new this.lastChoiceModel({ customer_id, room_id: params.id })
          await newChoice.save()
        }
      }
      res.status(200).send({
        valid: true,
        room: serviceResult.room,
      });
    } catch (err) {
      res.status(400).send({ valid: false, message: err.message });
    }
  }

  async host(req, res) {
    try {
      const params = { ...req.params, ...req.query };
      const serviceResult = await this.getRoomsByHostService.execute(params);
      if (serviceResult.failure) throw new Error(serviceResult.message);
      res.status(200).send({
        valid: true,
        rooms: serviceResult.rooms,
        total: serviceResult.total,
      });
    } catch (err) {
      res.status(400).send({ valid: false, message: err.message });
    }
  }

  async create(req, res) {
    try {
      const params = req.body;
      const serviceResult = await this.createRoomsService.execute(params)
      if (serviceResult.failure) throw new Error(serviceResult.message)
      await this.recommender.train()
      res.status(204).send(null)
    } catch (err) {
      res.status(400).send({ valid: false, message: err.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const params = req.body
      const serviceResult = this.updateRoomsService.execute(id, params)
      if (serviceResult.failure) throw new Error(serviceResult.message)
      res.status(201).send({ valid: true })
    } catch (err) {
      res.status(400).send({ valid: false, message: err.message })
    }
  }
}

module.exports = RoomController;