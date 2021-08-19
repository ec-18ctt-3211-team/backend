class ApplyDiscount {
    constructor({ appliedDiscountDaos }) {
        this.appliedDiscountDaos = appliedDiscountDaos;
    }
    async execute(params) {
        try {
            const daosResult = await this.appliedDiscountDaos.create(params);
            return daosResult;
        } catch (err) {
            return { failure: true, message: err.message };
        }
    }
}

module.exports = ApplyDiscount;