class UpdateCity {
    constructor({ cityDaos }) {
        this.cityDaos = cityDaos;

        this.execute = this.execute.bind(this);
    }
    async execute(params) {
        try {
            const { id, titles,thumnail,is_pinned } = params;
            const daosResult = await this.cityDaos.update(id, titles,thumnail,is_pinned);
            //I change to this because "Cannot read property 'failure' of null"
            if (!daosResult) throw new Error("City is not found");
            else if (daosResult.failure) throw new Error(daosResult.message);
            return daosResult;
        } catch (error) {
            return { failure: true, message: error.message };
        }
    }
}

module.exports = UpdateCity;
