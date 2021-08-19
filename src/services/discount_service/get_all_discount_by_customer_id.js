class GetAllDiscountByCustomerId {
    constructor({ discountDaos, appliedDiscountDaos }) {
        this.discountDaos = discountDaos;
        this.appliedDiscountDaos = appliedDiscountDaos;
        this.execute = this.execute.bind(this);
    }
    async execute(params, query) {
        try {
            const customer_id = params.id;
            const { limit, page } = query;
            const discountIds = await this.appliedDiscountDaos.getDiscountIdsByCustomerId(customer_id);
            if (discountIds.failure) throw new Error(discountIds.message);

            const discounts = await this.discountDaos.getAllByCustomerId(
                discountIds,
                { limit: parseInt(limit), page: parseInt(page) }
            );
            if (discounts.failure) throw new Error(discounts.message);
            return discounts;
        } catch (err) {
            return { failure: true, message: err.message };
        }
    }
}

module.exports = GetAllDiscountByCustomerId;