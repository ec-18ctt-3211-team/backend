class CustomerController {
    constructor({ getCustomerService, getAllCustomerService, updateCustomerService }) {
        this.getCustomerService = getCustomerService;
        this.getAllCustomerService = getAllCustomerService;
        this.updateCustomerService = updateCustomerService;
        this.get = this.get.bind(this);
        this.index = this.index.bind(this);
        this.update = this.update.bind(this);
    }

    async get(req, res) {
        try {
            const idParams = req.params;
            const serviceResult = await this.getCustomerService.execute(idParams);
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({ valid: true, customer: serviceResult.customer });
        } catch (err) {
            res.status(400).send({ valid: false, customer: null });
        }
    }

    async index(req, res) {
        try {
            const serviceResult = await this.getAllCustomerService.execute();
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({ valid: true, customer: serviceResult.customer });
        } catch (err) {
            res.status(400).send({ valid: false, customer: null });
        }
    }

    async update(req, res) {
        try {
            const idParams = req.params;
            const params = req.body;
            const serviceResult = await this.updateCustomerService.execute(idParams, params);
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({ valid: true, updateCustomer: serviceResult.customer, message: "updated successfully" });
        } catch (err) {
            res.status(400).send({ valid: false, updateCustomer: null, message: err.message });
        }
    }
}

module.exports = CustomerController;