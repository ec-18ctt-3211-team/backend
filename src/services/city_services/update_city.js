class UpdateCity {
  constructor({ cityDaos }) {
    this.cityDaos = cityDaos;

    this.execute = this.execute.bind(this);
  }
  async execute(params) {
    try {
      const { address } = params;
      const city = address.city;
      const parsedCity = city.split("_").join(" ");
      address.city = parsedCity;
      const daosResult = await this.cityDaos.update({
        ...params,
        address: address,
      });
      if (daosResult.failure || !daosResult.updatedCity)
        throw new Error(daosResult.message || "City is not found");
      return daosResult;
    } catch (error) {
      return { failure: true, message: error.message };
    }
  }
}

module.exports = UpdateCity;
