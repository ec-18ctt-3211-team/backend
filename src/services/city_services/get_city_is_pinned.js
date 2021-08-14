class GetCityIsPinned {
    constructor({cityDaos}) {
        this.cityDaos = cityDaos;

        this.execute = this.execute.bind(this);
    }

    async execute(params) {
        try {
            const { limit, page } = params
            const daosResult = await this.cityDaos.getIsPinned({
                limit: parseInt(limit),
                page: parseInt(page),
            });
            if (daosResult.failure) throw new Error(daosResult.message);
            return daosResult;
        } catch (error) {
            return { failure: true, message: error.message };
        }
    }
}

module.exports = GetCityIsPinned;