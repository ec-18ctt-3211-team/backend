class GetCityById {
    constructor({ cityDaos }) {
        this.cityDaos = cityDaos;

        this.execute = this.execute.bind(this);
    }

    async execute(params) {
        try {
            const { id } = params;
            const daosResult = await this.cityDaos.getById(id);
            if (daosResult.failure || !daosResult.length) throw new Error(daosResult.message || "City is not found");
            return daosResult;
        } catch (err) {
            return { failure: true, message: err.message };
        }
    }
}

module.exports = GetCityById;
