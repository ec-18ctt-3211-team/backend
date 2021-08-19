class DiscountController {
    constructor({
        getAllDiscountService,
        getAllDiscounIsPinnedService,
        getAllDiscountByCustomerIdService,
        createDiscountService,
        applyDiscountService,
        updateDiscountService,
        deleteDiscountService,
    }) {
        this.getAllDiscountService = getAllDiscountService;
        this.getAllDiscounIsPinnedService = getAllDiscounIsPinnedService;
        this.getAllDiscountByCustomerIdService = getAllDiscountByCustomerIdService;
        this.createDiscountService = createDiscountService;
        this.applyDiscountService = applyDiscountService;
        this.updateDiscountService = updateDiscountService;
        this.deleteDiscountService = deleteDiscountService;
        this.index = this.index.bind(this);
        this.pinned = this.pinned.bind(this);
        this.customerId = this.customerId.bind(this);
        this.create = this.create.bind(this);
        this.apply = this.apply.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async index(req, res) {
        try {
            const params = { ...req.query };
            const serviceResult = await this.getAllDiscountService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({
                valid: true,
                discounts: serviceResult.discounts,
                total: serviceResult.total,
            });
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message });
        }
    }

    async pinned(req, res) {
        try {
            const serviceResult = await this.getAllDiscounIsPinnedService.execute();
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({
                valid: true,
                discounts: serviceResult.discounts,
            });
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message });
        }
    }

    async customerId(req, res) {
        try {
            const params = req.params;
            const query = { ...req.query };
            const serviceResult = await this.getAllDiscountByCustomerIdService.execute(params, query);
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({
                valid: true,
                discounts: serviceResult.discounts,
                total: serviceResult.total,
            });
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message });
        }
    }

    async create(req, res) {
        try {
            const params = { ...req.body };
            const serviceResult = await this.createDiscountService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({
                valid: true,
                newDiscount: serviceResult.newDiscount,
            });
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message });
        }
    }

    async apply(req, res) {
        try {
            const params = { ...req.body };
            const serviceResult = await this.applyDiscountService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message)
            res.status(200).send({
                valid: true,
                newAppliedDiscount: serviceResult.newAppliedDiscount,
            });
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message })
        }
    }

    async update(req, res) {
        try {
            const params = { ...req.params, ...req.body };
            const serviceResult = await this.updateDiscountService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message)
            res.status(200).send({ valid: true, updatedDiscount: serviceResult.updatedDiscount })
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message })
        }
    }

    async delete(req, res) {
        try {
            const params = { ...req.params };
            const serviceResult = await this.deleteDiscountService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({
                valid: true,
                discount: serviceResult.discount,
                appliedDiscount: serviceResult.appliedDiscount,
            });
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message });
        }
    }

}

module.exports = DiscountController;