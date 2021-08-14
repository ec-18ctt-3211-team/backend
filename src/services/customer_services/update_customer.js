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
            const daosResult = await this.customerDaos.updateById(id, email, name,
                hashedPassword, phone, payment_number, ci);
            if (!daosResult) throw new Error("Customer is not found");
            else if (daosResult.failure) throw new Error(daosResult.message);
            return daosResult;
        } catch (error) {
            return { failure: true, message: error.message };
        }
    }
}

module.exports = UpdateCustomer;