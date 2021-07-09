class GetAllDiscount {
    constructor({ discountDaos }) {
        this.discountDaos = discountDaos;
    }
    async execute() {
        const discounts = await this.discountDaos.getAll();
        if (!discounts) {
            return {
                failure: true,
                message: "discounts not found",
            };
        }
        return discounts;
    }
}

module.exports = GetAllDiscount;