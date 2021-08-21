class RoomController {
  constructor({
    getRoomsService,
    getRoomByIdService,
    getRoomsByHostService,
  }) {
    this.getRoomsService = getRoomsService;
    this.getRoomByIdService = getRoomByIdService;
    this.getRoomsByHostService = getRoomsByHostService;

    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.host = this.host.bind(this);
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

}

module.exports = RoomController;
