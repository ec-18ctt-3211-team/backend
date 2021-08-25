class DeleteRoomService {
    constructor({ roomDaos }) {
      this.roomDaos = roomDaos;
  
      this.execute = this.execute.bind(this)
    }
  
    async execute(id) {
      const daosResult = await this.roomDaos.delete(id)
      return daosResult;
    }
  }
  
  module.exports = DeleteRoomService
  