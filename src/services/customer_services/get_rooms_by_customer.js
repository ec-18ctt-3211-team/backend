class GetRoomsByCustomer {
  constructor({ roomDaos }) {
    this.roomDaos = roomDaos;

    this.execute = this.execute.bind(this);
  }

  async execute(params) {
    const { id, limit, page } = params;
    const result = await this.roomDaos.getByCustomer(id, {
      limit: parseInt(limit),
      page: parseInt(page),
    });
    if (result.failure) return { failure: true, message: result.message };
    return result;
  }
}

module.exports = GetRoomsByCustomer;
