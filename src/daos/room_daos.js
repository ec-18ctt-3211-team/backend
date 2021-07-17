class RoomDaos {
  constructor({ roomModel, bookingDateDaos, extraPriceDaos, photoDaos }) {
    this.roomModel = roomModel;
    this.bookingDateDaos = bookingDateDaos;
    this.extraPriceDaos = extraPriceDaos;
    this.photoDaos = photoDaos;

    this.getByCity = this.getByCity.bind(this);
    this.getById = this.getById.bind(this);
    this.getByCustomer = this.getByCustomer.bind(this);
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
      if (room == null) throw new Error("Resource not found");
      const bookingDates = await this.bookingDateDaos.getByRoomId(room._id);
      const photos = await this.photoDaos.getByRoomId(room._id);
      const extraPrices = await this.extraPriceDaos.getByRoomId(room._id);
      return {
        room: {
          ...room._doc,
          bookingDates: bookingDates,
          photos: photos,
          extraPrices: extraPrices,
        },
      };
    } catch (err) {
      return { failure: true, message: err.message };
    }
  }

  async getByCustomer(host_id) {
    try {
      const rooms = await this.roomModel.find({ host_id });
      return { rooms };
    } catch (err) {
      return { failure: true, message: err.message };
    }
  }
}

module.exports = RoomDaos;
