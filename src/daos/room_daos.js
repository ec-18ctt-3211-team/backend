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

  async create(params) {
    try {
      const { photos } = params;
      const newRoom = await this.roomModel.insertMany([{ ...params, thumnail: photos[0] }])

      const newPhotos = photos.map(path => {
        return { room_id: newRoom[0]._id, path: path }
      });
      await this.photoModel.insertMany(newPhotos)
      return {}
    } catch (err) {
      return { failure: true, message: err.message }
    }
  }

  async update(id, params) {
    try {
      const { photos } = params;
      params = { ...params, thumnail: photos[0].path }
      const updatedRoom = await this.roomModel.findByIdAndUpdate(id, params, { new: true });
      for (let i = 0; i < photos.length; ++i) {
        const photo = await this.photoModel.findByIdAndUpdate(
          photos[i]._id, { path: photos[i].path }, { new: true }
        );
        if (!photo) throw new Error(`Photo <${newPhotoIds[i]}> not found`);
      }

      if (!updatedRoom) throw new Error('Update room failed');
      return { updatedRoom }
    } catch (err) {
      return { failure: true, message: err.message }
    }
  }

  async getByArrayId(ids) {
    try {
      const rooms = await this.roomModel.find({
        _id: {
          "$in": ids 
        }
      })
      return { rooms }
      } catch(err) {
      return { failure: true, message: err.message }
    }
  }
    
  async delete(id) {
    try {
      const deletedRoom = await this.roomModel.deleteOne({ _id: id });
      return { deletedRoom }
    } catch(err) {
      return { failure: true, message: err.message }
    }
  }
}

module.exports = RoomDaos;