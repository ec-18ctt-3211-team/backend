class GetRoomsByCustomer {
  constructor({ roomDaos }) {
    this.roomDaos = roomDaos;

    this.execute = this.execute.bind(this);
  }

  async execute(params) {
    const { id } = params;
    const result = await this.roomDaos.getByCustomer(id);
    if (result.failure) return { failure: true, message: result.message };
    return result;
  }
}

module.exports = GetRoomsByCustomer;
