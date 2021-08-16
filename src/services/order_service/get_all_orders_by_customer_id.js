class GetAllOrdersByCustomerId {
    constructor({ orderDaos }) {
        this.orderDaos = orderDaos;
    }
    async execute(params, query) {
        try {
            const customer_id = params.id;
            const { limit, page } = query;
            const orders = await this.orderDaos.getAllByCustomerId(
                customer_id,
                { limit: parseInt(limit), page: parseInt(page) }
            );
            if (!orders) throw new Error("orders not found");
            return orders;
        } catch (error) {
            return { failure: true, message: error, message };
        }
    }
}

module.exports = GetAllOrdersByCustomerId;
