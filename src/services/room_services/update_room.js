class UpdateRoomService {
  constructor({ roomDaos }) {
    this.roomDaos = roomDaos;

    this.execute = this.execute.bind(this)
  }

  async execute(id, params, newPhotoIds, newFileNames) {
    const daosResult = this.roomDaos.update(id, params, newPhotoIds, newFileNames)
    return daosResult;
  }
}

module.exports = UpdateRoomService