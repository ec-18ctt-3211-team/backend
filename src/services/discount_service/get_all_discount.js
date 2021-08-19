class GetAllDiscount {
    constructor({ discountDaos }) {
        this.discountDaos = discountDaos;
        this.execute = this.execute.bind(this);
    }
    async execute(params) {
        try {
            const { limit, page } = params
            const daosResult = await this.discountDaos.getAll({
                limit: parseInt(limit),
                page: parseInt(page),
            });
            if (daosResult.failure) throw new Error(daosResult.message);
            return daosResult;
        } catch (err) {
            return { failure: true, message: err.message };
        }
    }
}

module.exports = GetAllDiscount;