class UpdateRoomService {
  constructor({ roomDaos }) {
    this.roomDaos = roomDaos;

    this.execute = this.execute.bind(this);
  }

  async execute(id, params, newPhotoIds, newFileNames) {
    const { address } = params;
    const city = address.city;
    const parsedCity = city.split("_").join(" ");
    address.city = parsedCity;
    const daosResult = this.roomDaos.update(
      id, { ...params, address: address },
      newPhotoIds,
      newFileNames
    );
    return daosResult;
  }
}

module.exports = UpdateRoomService;