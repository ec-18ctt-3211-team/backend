class GetAllDiscount {
    constructor({ discountDaos }) {
        this.discountDaos = discountDaos;
    }
    async execute() {
        const discounts = await this.discountDaos.getAll();
        return discounts;
    }
}

module.exports = GetAllDiscount;