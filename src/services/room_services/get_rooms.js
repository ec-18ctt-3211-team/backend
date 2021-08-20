class GetRooms {
  constructor({ roomDaos }) {
    this.roomDaos = roomDaos;
    this.execute = this.execute.bind(this);
  }

  async execute(params) {
    try {
      const { city, limit, page, sort, type, keyword } = params;
      let result;
      if (!city && !type && !keyword) {
        result = await this.roomDaos.getAll({
          limit: parseInt(limit),
          page: parseInt(page),
        });
      } else {
        let parsedCity;
        if (city) parsedCity = city.split("_").join(" ");
        result = await this.roomDaos.getByCity(parsedCity, {
          limit: parseInt(limit),
          page: parseInt(page),
          sort,
          type,
          keyword
        });
      }
      if (result.failure) throw new Error(result.message);
      return result;
    } catch (err) {
      return { failure: true, message: err.message };
    }
  }
}

module.exports = GetRooms;
