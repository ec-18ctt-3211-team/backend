class RoomController {
  constructor({ getRoomsByCityService, getRoomByIdService }) {
    this.getRoomsByCityService = getRoomsByCityService;
    this.getRoomByIdService = getRoomByIdService;

    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
  }

  async index(req, res) {
    try {
      const params = { ...req.query };
      const serviceResult = await this.getRoomsByCityService.execute(params);
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
}

module.exports = RoomController;
