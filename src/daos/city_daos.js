class CityDaos {
  constructor({ cityModel }) {
    this.cityModel = cityModel;

    this.getAll = this.getAll.bind(this);
    this.getIsPinned = this.getIsPinned.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  async getAll(config = {}) {
    try {
      const { limit, page } = config;
      const skipRows = limit * (page - 1)
      let citys;
      if (!isNaN(limit) && !isNaN(page)) {
        citys = await this.cityModel
          .find({})
          .limit(limit)
          .skip(skipRows);
      } else {
        citys = await this.cityModel.find({});
      }
      const total = await this.cityModel.estimatedDocumentCount();
      return { citys, total };
    } catch (err) {
      return { failure: true, message: err.message || "Something went wrong" };
    }
  }

  async getIsPinned(config = {}) {
    try {
      const { limit, page } = config;
      const skipRows = limit * (page - 1)
      let citys;
      if (!isNaN(limit) && !isNaN(page)) {
        citys = await this.cityModel
          .find({ is_pinned: true })
          .limit(limit)
          .skip(skipRows);
      } else {
        citys = await this.cityModel.find({ is_pinned: true });
      }
      const total = await this.cityModel.countDocuments({ is_pinned: true });
      return { citys, total }
    } catch (err) {
      return { failure: true, message: err.message || "Something went wrong" };
    }
  }

  async getById(id) {
    try {
      const city = this.cityModel.find({ id });
      return city;
    } catch (err) {
      return { failure: true, message: "Something went wrong" };
    }
  }

  async create(params) {
    try {
      const newModel = await this.cityModel.insertMany(params)
      if (!newModel) throw new Error("Create model failed")
      return { newCity: newModel[0] };
    } catch (err) {
      return { failure: true, message: err.message }
    }
  }

  async update(id, titles, thumnail, is_pinned) {
    try {
      console.log(id, titles,thumnail,is_pinned);
      const updatedCity = await this.cityModel.findOneAndUpdate({ id: id }, {
        titles: titles,
        thumnail: thumnail,
        is_pinned: is_pinned,
      }, { new: true });
      return updatedCity;
    } catch (err) {
      return { failure: true, message: err.message }
    }
  }
}

module.exports = CityDaos;