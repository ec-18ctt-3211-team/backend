class GetCustomer {
    constructor({ customerDaos }) {
        this.customerDaos = customerDaos;
    }
    async execute(params) {
        try {
            const { id } = params;
            const customer = await this.customerDaos.getById(id);
            if (!customer) throw new Error("customer not found");
            return customer;
        } catch (error) {
            return null;
        }

    }
}

module.exports = GetCustomer;