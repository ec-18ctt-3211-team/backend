class BookingDateDaos {
  constructor({ bookingDateModel }) {
    this.bookingDateModel = bookingDateModel;
  }

  async getByRoomId(roomId) {
    try {
      const booking_dates = await this.bookingDateModel.find({room_id: roomId});
      return booking_dates;
    } catch (err) {
      return { failure: true, message: "Something went wrong" };
    }
  }
}

module.exports = BookingDateDaos;
