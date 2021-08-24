class RoomDaos {
  constructor({
    roomModel,
    bookingDateDaos,
    extraPriceDaos,
    photoDaos,
    photoModel,
    extraPriceModel
  }) {
    this.roomModel = roomModel;
    this.bookingDateDaos = bookingDateDaos;
    this.extraPriceDaos = extraPriceDaos;
    this.photoDaos = photoDaos;
    this.photoModel = photoModel;
    this.extraPriceModel = extraPriceModel;

    this.getAll = this.getAll.bind(this);
    this.getByCity = this.getByCity.bind(this);
    this.getById = this.getById.bind(this);
    this.getByCustomer = this.getByCustomer.bind(this);
    this.getByHost = this.getByHost.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }
  async getAll(config = {}) {
    try {
      const { limit, page } = config;
      const skipRows = limit * (page - 1);
      let rooms;
      if (limit != NaN && page != NaN) {
        rooms = await this.roomModel
          .find({})
          .limit(limit)
          .skip(skipRows)
      } else {
        rooms = this.roomModel.find({});
      }
      const total = await this.roomModel.countDocuments({})
      return { rooms, total }
    } catch (err) {
      return { failure: true, message: err.message }
    }
  }

  async getByCity(city, config = {}) {
    try {
      const { limit, page, sort, type, keyword } = config;

      let typeSort = 0
      if (sort === "inc") typeSort = 1
      else if (sort === "dec") typeSort = -1

      let rooms, total;
      const skipRows = limit * (page - 1);
      if (type && keyword) {
        const encoded = decodeURI(keyword);
        if (type === "title") {
          rooms = await this.roomModel
            .find({ title: { "$regex": encoded, $options: "i" } })
            .limit(limit)
            .skip(skipRows)
            .sort({ normal_price: typeSort });

          total = await this.roomModel.countDocuments({ title: { "$regex": encoded, $options: "i" } });
        } else if (type === "city") {
          rooms = await this.roomModel
            .find({
              "address.city": { "$regex": encoded, "$options": "i" }
            })
            .limit(limit)
            .skip(skipRows)
            .sort({ normal_price: typeSort });

          total = await this.roomModel.countDocuments({ "address.city": { "$regex": encoded, "$options": "i" } });
        }
      } else {
        rooms = await this.roomModel
          .find({ "address.city": city })
          .limit(limit)
          .skip(skipRows)
          .sort({ normal_price: typeSort });

        total = await this.roomModel.countDocuments({
          "address.city": city,
        });
      }
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

  async getByCustomer(host_id, config = {}) {
    try {
      const { limit, page } = config;
      const skipRows = limit * (page - 1);
      let rooms;
      if (limit != NaN && page != NaN) {
        rooms = await this.roomModel
          .find({ host_id })
          .limit(limit)
          .skip(skipRows);
      } else {
        rooms = await this.roomModel.find({ host_id });
      }
      const total = await this.roomModel.countDocuments({ host_id });
      return { rooms, total };
    } catch (err) {
      return { failure: true, message: err.message };
    }
  }

  async getByHost(host_id, config = {}) {
    try {
      const { limit, page } = config;
      const skipRows = limit * (page - 1);
      let rooms;
      if (limit != NaN && page != NaN) {
        rooms = await this.roomModel
          .find({ host_id })
          .limit(limit)
          .skip(skipRows);
      } else {
        rooms = await this.roomModel.find({ host_id });
      }
      const total = await this.roomModel.countDocuments({ host_id });
      return { rooms, total };
    } catch (err) {
      return { failure: true, message: err.message };
    }
  }

  async create(params, newFileNames) {
    try {
      const { extraPrices } = params;
      let newPrices = null;
      delete params.extraPrices;

      const newRoom = await this.roomModel.insertMany([{ ...params }])

      if (extraPrices) {
        extraPrices = extraPrices.map(price => {
          return { room_id: newRoom._id, ...price }
        });
        const newPrices = await this.extraPriceModel.insertMany(extraPrices)
      }

      const photos = newFileNames.map(name => {
        return { room_id: newRoom[0]._id, path: `/${name}` }
      });
      const newPhotos = await this.photoModel.insertMany(photos)

      return {}
    } catch (err) {
      return { failure: true, message: err.message }
    }
  }

  async update(id, params, newFileNames) {
    try {
      const updatedRoom = this.roomModel.findByIdAndUpdate(id, { ...params }, { new: true });
      const
    } catch (err) {

    }
  }
}

module.exports = RoomDaos;