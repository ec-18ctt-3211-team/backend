class GetCustomer {
    constructor({ customerDaos }) {
        this.customerDaos = customerDaos;
    }
    async execute(params) {
        const { id } = params;
        const daosResult = await this.customerDaos.getById(id);
        if (!daosResult.customer) {
            return {
                failure: true,
                message: "CustomerID is not exist",
            };
        }
        return daosResult;
    }
}

module.exports = GetCustomer;