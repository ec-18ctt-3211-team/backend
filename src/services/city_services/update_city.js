class UpdateCity {
    constructor({ cityDaos }) {
        this.cityDaos = cityDaos;

        this.execute = this.execute.bind(this);
    }
    async execute(params) {
        try {
            const { id, titles, room_id, thumnail, is_pinned } = params;
            const daosResult = await this.cityDaos.update(id, titles, room_id, thumnail, is_pinned);
            if (daosResult.failure || !daosResult.updatedCity) throw new Error(daosResult.message || "City is not found");
            return daosResult;
        } catch (error) {
            return { failure: true, message: error.message };
        }
    }
}

module.exports = UpdateCity;
