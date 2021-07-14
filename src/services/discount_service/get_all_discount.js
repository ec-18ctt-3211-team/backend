class GetAllDiscount {
    constructor({ discountDaos }) {
        this.discountDaos = discountDaos;
    }
    async execute() {
        try {
            const discounts = await this.discountDaos.getAll();
            if (!discounts) throw new Error("customer not found");
            return discounts;
        } catch (error) {
            return null;
        }
    }
}

module.exports = GetAllDiscount;