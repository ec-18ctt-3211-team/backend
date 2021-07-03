class GetAllDiscount {
    constructor({ discountDaos }) {
        this.discountDaos = discountDaos;
    }
    async execute() {
        const discount = await this.discountDaos.getAll();
        if (!discount) {
            return {
                failure: true,
                message: "customer not found",
            };
        }
        return discount;
    }
}

module.exports = GetAllDiscount;