class UpdateCustomer {
    constructor({ customerDaos, passwordHasher }) {
        this.customerDaos = customerDaos;
        this.passwordHasher = passwordHasher;
    }
    async execute(params, body) {
        const { id } = params;
        const { email, name, password, phone, payment_number, ci } = body;
        const hashedPassword = await this.passwordHasher.hash(password);
        const customer = await this.customerDaos.updateById(id, email, name,
            hashedPassword, phone, payment_number, ci);
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