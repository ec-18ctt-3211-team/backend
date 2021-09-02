class CreateRoomService {
  constructor({ roomDaos }) {
    this.roomDaos = roomDaos;

    this.execute = this.execute.bind(this);
  }

  async execute(params) {
    const { address } = params;
    const parsedCity = address.city.split("_").join(" ");
    const daosResult = await this.roomDaos.create({
      ...params,
      address: { city: parsedCity },
    });
    return daosResult;
  }
}

module.exports = CreateRoomService;
