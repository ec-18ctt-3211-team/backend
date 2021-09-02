class CreateRoomService {
  constructor({ roomDaos }) {
    this.roomDaos = roomDaos;

    this.execute = this.execute.bind(this);
  }

  async execute(params) {
    const daosResult = await this.roomDaos.create({ params });
    return daosResult;
  }
}

module.exports = CreateRoomService;
