class GetAllCustomer {
    constructor({ customerDaos }) {
        this.customerDaos = customerDaos;
    }
    async execute() {
        try {
            const customers = await this.customerDaos.getAll();
            if (!customers) throw new Error("customer not found");
            return customers;
        } catch (error) {
            return null;
        }
    }
}

module.exports = GetAllCustomer;