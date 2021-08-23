class CreateRoomService {
  constructor({ roomDaos }) {
    this.roomDaos = roomDaos;

    this.execute = this.execute.bind(this)
  }

  async execute(params, newFileNames) {
    const daosResult = this.roomDaos.create(params, newFileNames)
    return daosResult;
  }
}

module.exports = CreateRoomService
