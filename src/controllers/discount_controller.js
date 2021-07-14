class DiscountController {
    constructor({ getAllDiscountService }) {
        this.getAllDiscountService = getAllDiscountService;
        this.index = this.index.bind(this);
    }

    async index(req, res) {
        try {
            const serviceResult = await this.getAllDiscountService.execute();
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({ valid: true, discounts: serviceResult.discount });
        } catch (err) {
            res.status(400).send({ valid: false, discounts: null });
        }
    }
}

module.exports = DiscountController;