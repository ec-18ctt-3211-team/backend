class GetAllOrdersByCustomerId {
    constructor({ orderDaos }) {
        this.orderDaos = orderDaos;
    }
    async execute(params) {
        try {
            const { limit, page, customer_id } = params
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
