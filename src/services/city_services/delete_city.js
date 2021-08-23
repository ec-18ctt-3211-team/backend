class DeleteCity {
    constructor({ cityDaos }) {
        this.cityDaos = cityDaos;

        this.execute = this.execute.bind(this);
    }

    async execute(params) {
        try {
            const { id } = params;
            const daosResult = await this.cityDaos.delete(id);
            if (daosResult.failure || daosResult.deletedCount == 0) throw new Error(daosResult.message || "City is not found");
            const city = {
                message: " delete city successfully.",
                deletedCount: daosResult.deletedCount
            }
            return { city };
        } catch (err) {
            return { failure: true, message: err.message };
        }
    }
}

module.exports = DeleteCity;