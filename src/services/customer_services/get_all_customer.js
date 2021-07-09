class GetAllCustomer {
    constructor({ customerDaos }) {
        this.customerDaos = customerDaos;
    }
    async execute() {
        const customers = await this.customerDaos.getAll();
        return customers;
    }
}

module.exports = GetAllCustomer;