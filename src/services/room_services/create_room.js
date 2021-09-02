class CreateRoomService {
  constructor({ roomDaos }) {
    this.roomDaos = roomDaos;

    this.execute = this.execute.bind(this);
  }

  async execute(params) {
    const { city } = params;
    const parsedCity = city.split("_").join(" ");
    const daosResult = await this.roomDaos.create({
      ...params,
      city: parsedCity,
    });
    return daosResult;
  }
}

module.exports = CreateRoomService;
