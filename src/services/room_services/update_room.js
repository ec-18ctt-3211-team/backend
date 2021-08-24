class UpdateRoomService {
  constructor({ roomDaos }) {
    this.roomDaos = roomDaos;

    this.execute = this.execute.bind(this)
  }

  async execute(id, params) {
    const daosResult = this.roomDaos.update(id, params)
    return daosResult;
  }
}

module.exports = UpdateRoomService