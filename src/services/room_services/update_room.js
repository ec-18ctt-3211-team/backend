class UpdateRoomService {
  constructor({ roomDaos }) {
    this.roomDaos = roomDaos;

    this.execute = this.execute.bind(this)
  }

  async execute(id, params, newFileNames) {
    const daosResult = this.roomDaos.create(id, params, newFileNames)
    return daosResult;
  }
}

module.exports = UpdateRoomService