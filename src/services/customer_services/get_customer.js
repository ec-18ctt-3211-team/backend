class GetCustomer {
    constructor({ customerDaos }) {
        this.customerDaos = customerDaos;
    }
    async execute(params) {
        const { id } = params;
        const customer = await this.customerDaos.getById(id);
        if (!customer) {
            return {
                failure: true,
                message: "customer not found",
            };
        }
        return customer;
    }
}

module.exports = GetCustomer;