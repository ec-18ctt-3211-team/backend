class GetCityIsPinned {
    constructor({cityDaos}) {
        this.cityDaos = cityDaos;

        this.execute = this.execute.bind(this);
    }

    async execute(params) {
        try {
            const daosResult = await this.cityDaos.getIsPinned();
            if (daosResult.failure) throw new Error(daosResult.message);
            return daosResult;
        } catch (error) {
            return { failure: true, message: error.message };
        }
    }
}

module.exports = GetCityIsPinned;
