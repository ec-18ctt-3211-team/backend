class ExtraPriceDaos {
  constructor({ extraPriceModel }) {
    this.extraPriceModel = extraPriceModel;
  }

  async getByRoomId(roomId) {
    try {
      const extra_prices = await this.extraPriceModel.find({ room_id: roomId });
      return extra_prices;
    } catch (err) {
      return { failure: true, message: "Something went wrong" };
    }
  }
}

module.exports = ExtraPriceDaos;
