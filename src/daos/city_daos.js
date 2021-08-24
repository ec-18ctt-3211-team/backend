const mongoose = require("mongoose");

class CityDaos {
  constructor({ cityModel }) {
    this.cityModel = cityModel;

    this.getAll = this.getAll.bind(this);
    this.getIsPinned = this.getIsPinned.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(config = {}) {
    try {
      const { limit, page } = config;
      const skipRows = limit * (page - 1)
      let cities;
      if (!isNaN(limit) && !isNaN(page)) {
        cities = await this.cityModel
          .find({})
          .select('-_id')
          .limit(limit)
          .skip(skipRows);
      } else {
        cities = await this.cityModel
          .find({})
          .select('-_id');
      }
      const total = await this.cityModel.estimatedDocumentCount();
      return { cities, total };
    } catch (err) {
      return { failure: true, message: err.message || "Something went wrong" };
    }
  }

  async getIsPinned() {
    try {
      const cities = await this.cityModel
        .find({ is_pinned: true })
        .select('-_id');
      return { cities };
    } catch (err) {
      return { failure: true, message: err.message || "Something went wrong" };
    }
  }

  async getById(id) {
    try {
      const city = await this.cityModel
        .find({ id })
        .select('-_id');
      return { city };
    } catch (err) {
      return { failure: true, message: err.message || "Something went wrong" };
    }
  }

  async create(params) {
    try {
      const newModel = await this.cityModel.insertMany(params)
      if (!newModel) throw new Error("Create model failed")
      return { newCity: newModel[0] };
    } catch (err) {
      return { failure: true, message: err.message || "Something went wrong" }
    }
  }

  async update(id, titles, room_id, thumnail, is_pinned) {
    try {
      let roomId
      if (typeof room_id !== 'undefined') {
        roomId = mongoose.Types.ObjectId(room_id)
      }
      else {
        roomId = null
      }
      const updatedCity = await this.cityModel
        .findOneAndUpdate({ id: id }, {
          titles: titles,
          room_id: roomId,
          thumnail: thumnail,
          is_pinned: is_pinned,
        }, { new: true })
        .select('-_id');
      return { updatedCity };
    } catch (err) {
      return { failure: true, message: err.message || "Something went wrong" }
    }
  }

  async delete(id) {
    try {
      const res = await this.cityModel.deleteOne({ id: id });
      return { result: res.ok, deletedCount: res.deletedCount };
    } catch (err) {
      return { failure: true, message: err.message || "Something went wrong" };
    }
  }
}

module.exports = CityDaos;
