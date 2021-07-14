class UpdateCustomer {
    constructor({ customerDaos, passwordHasher }) {
        this.customerDaos = customerDaos;
        this.passwordHasher = passwordHasher;
    }
    async execute(params, body) {
        try {
            const { id } = params;
            const { email, name, password, phone, payment_number, ci } = body;
            const hashedPassword = await this.passwordHasher.hash(password);
            const customer = await this.customerDaos.updateById(id, email, name,
                hashedPassword, phone, payment_number, ci);
            if (!customer) throw new Error("customer not found");
            return customer;
        } catch (error) {
            return null;
        }
    }
}

module.exports = UpdateCustomer;