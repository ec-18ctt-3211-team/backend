class CreateDiscount {
    constructor({ discountDaos }) {
        this.discountDaos = discountDaos;

        this.execute = this.execute.bind(this);
    }

    async execute(params) {
        try {
            const daosResult = await this.discountDaos.create(params);
            return daosResult;
        } catch (err) {
            return { failure: true, message: err.message };
        }
    }

}

module.exports = CreateDiscount;
