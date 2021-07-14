class GetRoomsByCity {
  constructor({ roomDaos }) {
    this.roomDaos = roomDaos;

    this.execute = this.execute.bind(this);
  }

  async execute(params) {
    const { city, limit, page } = params;
    const parsedCity = city.split("-").join(" ");
    return await this.roomDaos.getByCity(parsedCity, {
      limit: parseInt(limit),
      page: parseInt(page),
    });
  }
}

module.exports = GetRoomsByCity;
