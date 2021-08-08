class CustomerController {
    constructor({ getCustomerService, getAllCustomerService, updateCustomerService }) {
        this.getCustomerService = getCustomerService;
        this.getAllCustomerService = getAllCustomerService;
        this.updateCustomerService = updateCustomerService;
        this.show = this.show.bind(this);
        this.index = this.index.bind(this);
        this.update = this.update.bind(this);
    }

    async show(req, res) {
        try {
            const params = req.params;
            const serviceResult = await this.getCustomerService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({ valid: true, customer: serviceResult.customer });
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message  });
        }
    }

    async index(req, res) {
        try {
            const serviceResult = await this.getAllCustomerService.execute();
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({ valid: true, customers: serviceResult.customer });
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message });
        }
    }

    async update(req, res) {
        try {
            const params = req.params;
            const body = req.body;
            const serviceResult = await this.updateCustomerService.execute(params, body);
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({
                valid: true,
                updateCustomer: serviceResult.customer, message: "updated successfully"
            });
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message });
        }
    }
}

module.exports = CustomerController;