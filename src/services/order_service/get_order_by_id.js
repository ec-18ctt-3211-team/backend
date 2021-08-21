class GetOrderById {
    constructor({ orderDaos }) {
        this.orderDaos = orderDaos;

        this.execute = this.execute.bind(this);
    }
    async execute(params) {
        try {
            const { id } = params;
            const daosResult = await this.orderDaos.getById(id);
            if (daosResult.failure || !daosResult.order) throw new Error(daosResult.message || "Order Id is not exist");
            return daosResult;
        } catch (error) {
            return { failure: true, message: error.message };
        }
    }
}

module.exports = GetOrderById;
