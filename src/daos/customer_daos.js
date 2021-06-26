class CustomerDaos {
    constructor({ customerModel }) {
        this.customerModel = customerModel;
    }

    async findAll() {
        try {
            const customer = await this.customerModel.findAll();
            return { customer }
        } catch (err) {
            return { failure: true, message: "Something went wrong" }
        }
    }

    async findById(id) {
        try {
            const customer = await this.customerModel.findById({ _id: id });
            return { customer };
        } catch (err) {
            return { failure: true, message: "Something went wrong" }
        }
    }

    async updateById(id) {
        const customer = await this.customerModel.updateById({ _id: id });
        if (!customer) return null;
        await customer.save();
        return customer;
    }
}

module.exports = CustomerDaos;