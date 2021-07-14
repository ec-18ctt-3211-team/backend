class GetRoomById {
  constructor({ roomDaos }) {
    this.roomDaos = roomDaos;

    this.execute = this.execute.bind(this);
  }

  async execute(params) {
    try {
      const { id } = params;
      const result = await this.roomDaos.getById(id);
      if (result.room == null) throw new Error("Resource not found");
      return result;
    } catch (err) {
      return { failure: true, message: err.message };
    }
  }
}

module.exports = GetRoomById;
