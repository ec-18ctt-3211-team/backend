class UpdateCustomer {
    constructor({ customerDaos, passwordHasher }) {
        this.customerDaos = customerDaos;
        this.passwordHasher = passwordHasher;
    }
    async execute(idParams, params) {
        const { id } = idParams;
        const { email, name, password, phone, payment_number, ci } = params;
        const hashedPassword = await this.passwordHasher.hash(password);
        const customer = await this.customerDaos.updateById(id, email, name, hashedPassword, phone, payment_number, ci);
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