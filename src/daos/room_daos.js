class RoomDaos {
  constructor({ roomModel }) {
    this.roomModel = roomModel;

    this.getByCity = this.getByCity.bind(this);
    this.getById = this.getById.bind(this);
  }

  async getByCity(city, config = {}) {
    try {
      const { limit, page } = config;
      const skipRows = limit * page;
      let rooms;
      if (limit != NaN && page != NaN) {
        rooms = await this.roomModel
          .find({ "address.city": city })
          .limit(limit)
          .skip(skipRows);
      } else {
        rooms = await this.roomModel.find({ "address.city": city });
      }
      const total = await this.roomModel.countDocuments({
        "address.city": city,
      });
      return { rooms, total };
    } catch (err) {
      return { failure: true, message: err.message };
    }
  }

  async getById(id) {
    try {
      const room = await this.roomModel.findById(id);
      return { room };
    } catch (err) {
      return { failure: true, message: err.message };
    }
  }
}

module.exports = RoomDaos;
