class DiscountDaos {
    constructor({ discountModel }) {
        this.discountModel = discountModel;
    }

    async getAll() {
        try {
            const discount = await this.discountModel.find({});
            return {discount};
        } catch (err) {
            return { failure: true, message: "Something went wrong" };
        }
    }
}

module.exports = DiscountDaos;