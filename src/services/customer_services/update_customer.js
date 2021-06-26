class UpdateCustomer {
    constructor({ customerDaos }) {
        this.customerDaos = customerDaos;
    }
    async execute(params) {
        const { id } = params;
        const customer = await this.customerDaos.UpdateCustomer(id);
        if (!customer) {
            return {
                failure: true,
                message: "customer not found",
            };
        }
        return customer;
    }
}

module.exports = UpdateCustomer;