class GetDiscountById {
    constructor({ discountDaos }) {
        this.discountDaos = discountDaos;
        this.execute = this.execute.bind(this);
    }
    async execute(params) {
        try {
            const { id } = params;
            const daosResult = await this.discountDaos.getById(id);
            if (daosResult.failure || !daosResult.discount) throw new Error(daosResult.message || "Discount Id is not exist");
            return daosResult;
        } catch (err) {
            return { failure: true, message: err.message };
        }
    }
}

module.exports = GetDiscountById;