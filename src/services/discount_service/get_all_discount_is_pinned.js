class GetAllDiscounIsPinned {
    constructor({ discountDaos }) {
        this.discountDaos = discountDaos;
        this.execute = this.execute.bind(this);
    }
    async execute() {
        try {
            const daosResult = await this.discountDaos.getIsPinned();
            if (daosResult.failure) throw new Error(daosResult.message);
            return daosResult;
        } catch (err) {
            return { failure: true, message: err.message };
        }
    }
}

module.exports = GetAllDiscounIsPinned;