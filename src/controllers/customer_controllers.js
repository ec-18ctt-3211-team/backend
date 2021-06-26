class CustomerController {
    constructor({ getCustomerService, getAllCustomerService, updateCustomerService }) {
        this.getCustomerService = getCustomerService;
        this.getAllCustomerService = getAllCustomerService;
        this.updateCustomerService = updateCustomerService;
        this.getCustomer = this.getCustomer.bind(this);
        this.getAllCustomer = this.getAllCustomer.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
    }

    async getCustomer(req, res) {
        try {
            const params = req.body;
            const serviceResult = await this.getCustomerService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({ valid: true, customer: serviceResult.Customer });
        } catch (err) {
            res.send({ valid: false, customer: null });
        }
    }

    async getAllCustomer(req, res) {
        try {
            const serviceResult = await this.getAllCustomerService.execute();
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({ valid: true, customer: serviceResult.Customer });
        } catch (err) {
            res.send({ valid: false, customer: null });
        }
    }

    async updateCustomer(req, res) {
        try {
            const params = req.body;
            const serviceResult = await this.updateCustomerService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({ valid: true, updateCustomer: serviceResult, message: "updated successfully" });
        } catch (err) {
            res.send({ valid: false, updateCustomer: null, message: err.message });
        }
    }
}

module.exports = CustomerController;