class CustomerController {
    constructor({
        getCustomerService,
        getAllCustomerService,
        updateCustomerService,
        getRoomByCustomerService,
    }) {
        this.getCustomerService = getCustomerService;
        this.getAllCustomerService = getAllCustomerService;
        this.updateCustomerService = updateCustomerService;
        this.getRoomByCustomerService = getRoomByCustomerService;
        this.show = this.show.bind(this);
        this.index = this.index.bind(this);
        this.update = this.update.bind(this);
        this.rooms = this.rooms.bind(this);
    }

    async show(req, res) {
        try {
            const params = req.params;
            const serviceResult = await this.getCustomerService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({ valid: true, customer: serviceResult });
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message });
        }
    }

    async index(req, res) {
        try {
            const params = { ...req.query };
            const serviceResult = await this.getAllCustomerService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({
                valid: true,
                customers: serviceResult.customers,
                total: serviceResult.total,
            });
        } catch (err) {
            res.status(400).send({ valid: false, customer: null });
        }
    }

    async update(req, res) {
        try {
            const params = req.params;
            const body = req.body;
            const serviceResult = await this.updateCustomerService.execute(
                params,
                body
            );
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({
                valid: true,
                updateCustomer: serviceResult,
                message: "updated successfully",
            });
        } catch (err) {
            res
                .status(400)
                .send({ valid: false, message: err.message });
        }
    }

    async rooms(req, res) {
        try {
            const params = { ...req.params, ...req.query };
            const serviceResult = await this.getRoomByCustomerService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({
                valid: true,
                rooms: serviceResult.rooms,
                total: serviceResult.total,
            });
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message });
        }
    }
}

module.exports = CustomerController;
