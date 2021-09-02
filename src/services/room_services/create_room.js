class CreateRoomService {
  constructor({ roomDaos }) {
    this.roomDaos = roomDaos;

    this.execute = this.execute.bind(this);
  }

  async execute(params) {
    const { address } = params;
    const city = address.city;
    const parsedCity = city.split("_").join(" ");
    address.city = parsedCity;
    const daosResult = await this.roomDaos.create({ params });
    return daosResult;
  }
}

module.exports = CreateRoomService;
