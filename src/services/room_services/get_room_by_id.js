class GetRoomById {
  constructor({ roomDaos }) {
    this.roomDaos = roomDaos;

    this.execute = this.execute.bind(this);
  }

  async execute(params) {
    try {
      const { id } = params;
      const result = await this.roomDaos.getById(id);
      if (result.failure) throw new Error(result.message);
      return result;
    } catch (err) {
      return { failure: true, message: err.message };
    }
  }
}

module.exports = GetRoomById;
