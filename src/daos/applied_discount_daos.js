class AppliedDiscountDaos {
    constructor({ appliedDiscountModel }) {
        this.appliedDiscountModel = appliedDiscountModel;
        this.getDiscountIdsByCustomerId = this.getDiscountIdsByCustomerId.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getDiscountIdsByCustomerId(customer_id) {
        try {
            let discountIds = []
            const discounts = await this.appliedDiscountModel.
                find({ customer_id: customer_id })
            for (let discount of discounts) {
                discountIds.push(discount.discount_id);
            }
            return discountIds;
        } catch (err) {
            return { failure: true, message: err.message || "Something went wrong" };
        }
    }

    async create(params) {
        try {
            const newModel = await this.appliedDiscountModel.insertMany(params)
            if (!newModel) throw new Error("Create model failed")
            return { newAppliedDiscount: newModel[0] };
        } catch (err) {
            return { failure: true, message: err.message || "Something went wrong" };
        }
    }

    async delete(discount_id) {
        try {
            const res = await this.appliedDiscountModel.deleteMany({ discount_id: discount_id });
            return { result: res.ok, deletedCount: res.deletedCount };
        } catch (err) {
            return { failure: true, message: err.message || "Something went wrong" };
        }
    }
}

module.exports = AppliedDiscountDaos;