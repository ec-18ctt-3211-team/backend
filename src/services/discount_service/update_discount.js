class UpdateDiscount {
    constructor({ discountDaos }) {
        this.discountDaos = discountDaos;

        this.execute = this.execute.bind(this);
    }

    async execute(params) {
        try {
            const { id, discount_price, description, code, is_pinned, thumnail } = params;
            const daosResult = await this.discountDaos.update(id, discount_price, description, code, is_pinned, thumnail);
            if (daosResult.failure || !daosResult.updatedDiscount) throw new Error(daosResult.message || "Discount Id is not exist");
            return daosResult;
        } catch (err) {
            return { failure: true, message: err.message };
        }
    }

}

module.exports = UpdateDiscount;
