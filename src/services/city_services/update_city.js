class UpdateCity {
    constructor({ cityDaos }) {
        this.cityDaos = cityDaos;

        this.execute = this.execute.bind(this);
    }
    async execute(params) {
        try {
            const daosResult = await this.cityDaos.update(params);
            if (daosResult.failure || !daosResult.updatedCity) throw new Error(daosResult.message || "City is not found");
            return daosResult;
        } catch (error) {
            return { failure: true, message: error.message };
        }
    }
}

module.exports = UpdateCity;
