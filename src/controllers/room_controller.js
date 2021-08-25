class RoomController {
  constructor({
    getRoomsService,
    getRoomByIdService,
    getRoomsByHostService,
    createRoomsService,
    updateRoomsService
  }) {
    this.getRoomsService = getRoomsService;
    this.getRoomByIdService = getRoomByIdService;
    this.getRoomsByHostService = getRoomsByHostService;
    this.createRoomsService = createRoomsService;
    this.updateRoomsService = updateRoomsService;

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
      const serviceResult = await this.getRoomByIdService.execute(params);
      if (serviceResult.failure) throw new Error(serviceResult.message);
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