class UpdateCustomer {
    constructor({ customerDaos, passwordHasher }) {
        this.customerDaos = customerDaos;
        this.passwordHasher = passwordHasher;
    }
    async execute(params) {
        try {
            if (params.password) {
                const hashedPassword = await this.passwordHasher.hash(params.password);
                params.password = hashedPassword;
            }
            const daosResult = await this.customerDaos.updateById(params);
            if (!daosResult) throw new Error("Customer is not found");
            else if (daosResult.failure) throw new Error(daosResult.message);
            return daosResult;
        } catch (error) {
            return { failure: true, message: error.message };
        }
    }
}

module.exports = UpdateCustomer;
