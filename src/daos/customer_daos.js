class CustomerDaos {
    constructor({ customerModel }) {
        this.customerModel = customerModel;
    }

    async getAll() {
        try {
            const customer = await this.customerModel.find({});
            return { customer };
        } catch (err) {
            return { failure: true, message: "Something went wrong" }
        }
    }

    async getById(id) {
        try {
            const customer = await this.customerModel.findById(id);
            return { customer };
        } catch (err) {
            return { failure: true, message: "Something went wrong" }
        }
    }

    async updateById(id, email, name, password, phone, payment_number, ci) {
        const customer = await this.customerModel.findByIdAndUpdate(id, {
            email: email,
            name: name,
            password: password,
            phone: phone,
            payment_number: payment_number,
            ci: ci
        }, { new: true });
        if (!customer) {
            return {
                failure: true,
                message: "Customer not found",
            };
        }
        return { customer };
    }
}

module.exports = CustomerDaos;