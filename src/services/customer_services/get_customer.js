class GetCustomer {
    constructor({ customerDaos }) {
        this.customerDaos = customerDaos;
    }
    async execute(params) {
        try {
            const { id } = params;
            const daosResult = await this.customerDaos.getById(id);
            if (!daosResult) throw new Error("Customer is not found");
            else if (daosResult.failure) throw new Error(daosResult.message);
            return daosResult;
        } catch (err) {
            return { failure: true, message: err.message };
        }
    }
}

module.exports = GetCustomer;
