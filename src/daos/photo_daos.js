class PhotoDaos {
  constructor({ photoModel }) {
    this.photoModel = photoModel;
  }

  async getByRoomId(roomId) {
    try {
      const photos = await this.discountModel.find({room_id: roomId});
      return photos;
    } catch (err) {
      return { failure: true, message: "Something went wrong" };
    }
  }
}

module.exports = PhotoDaos;
