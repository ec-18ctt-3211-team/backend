class GetAllCustomer {
    constructor({ customerDaos }) {
        this.customerDaos = customerDaos;
    }
    async execute() {
        const customer = await this.customerDaos.GetAllCustomer();
        if (!customer) {
            return {
                failure: true,
                message: "customer not found",
            };
        }
        return customer;
    }
}

module.exports = GetAllCustomer;