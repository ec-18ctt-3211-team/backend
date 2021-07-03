class CustomerDaos {
    constructor({ customerModel }) {
        this.customerModel = customerModel;
    }

    async getAll() {
        try {
            const customer = await this.customerModel.find({});
            return { customer }
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
        const customer = await this.customerModel.findById(id);
        if (!customer) return null;
        customer.email = email;
        customer.name = name;
        customer.password = password;
        customer.phone = phone;
        customer.payment_number = payment_number;
        customer.ci = ci;
        await customer.save();
        return { customer };
    }
}

module.exports = CustomerDaos;