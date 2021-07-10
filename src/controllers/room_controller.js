class RoomController {
  constructor({ getRoomsByCity }) {
    this.getRoomsByCity = getRoomsByCity;

    this.index = this.index.bind(this)
  }

  async index(req, res) {
    try {
      const params = { ...req.params, ...req.query }
      const serviceResult = this.getRoomsByCity.execute(params);
      if (serviceResult.failure) throw new Error(serviceResult.message)
      res.status(200).send({ valid: true, rooms: serviceResult.rooms })
    } catch(err) {
      res.status(400).send({ valid: false, message: err.message })
    }
  }
}