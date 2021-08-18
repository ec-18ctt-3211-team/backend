var ObjectId = require('mongodb').ObjectId;

class DiscountDaos {
    constructor({ discountModel, appliedDiscountDaos }) {
        this.discountModel = discountModel;
        this.appliedDiscountDaos = appliedDiscountDaos;
        this.getAll = this.getAll.bind(this);
        this.getIsPinned = this.getIsPinned.bind(this);
        this.getAllByCustomerId = this.getAllByCustomerId.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(config = {}) {
        try {
            const { limit, page } = config;
            const skipRows = limit * (page - 1);
            let discounts;
            if (!isNaN(limit) && !isNaN(page)) {
                discounts = await this.discountModel
                    .find({})
                    .limit(limit)
                    .skip(skipRows);
            } else {
                discounts = await this.discountModel.find({});
            }
            const total = await this.discountModel.estimatedDocumentCount();
            return { discounts, total };
        } catch (err) {
            return { failure: true, message: "Something went wrong" };
        }
    }

    async getIsPinned() {
        try {
            const discounts = await this.discountModel
                .find({ is_pinned: true });
            return { discounts };
        } catch (err) {
            return { failure: true, message: err.message || "Something went wrong" };
        }
    }

    async getAllByCustomerId(discountIds, config = {}) {
        try {
            const { limit, page } = config;
            const skipRows = limit * (page - 1)
            let discounts;
            if (limit != NaN && page != NaN) {
                discounts = await this.discountModel
                    .find({ _id: { $nin: discountIds } })
                    .limit(limit)
                    .skip(skipRows);
            } else {
                discounts = await this.discountModel.find({ _id: { $nin: discountIds } });
            }
            const total = await this.discountModel.countDocuments({ _id: { $nin: discountIds } });
            return { discounts, total };
        } catch (err) {
            return { failure: true, message: err.message }
        }
    }

    async create(params) {
        try {
            const newDiscountModel = await this.discountModel.insertMany(params)
            if (!newDiscountModel) throw new Error("Create discount model failed");
            return {
                newDiscount: newDiscountModel[0],
            };
        } catch (err) {
            return { failure: true, message: err.message || "Something went wrong" }
        }
    }

    async update(id, discount_price, description, code, is_pinned, thumnail) {
        try {
            const updatedDiscount = await this.discountModel
                .findByIdAndUpdate(id, {
                    discount_price: discount_price,
                    description: description,
                    code: code,
                    is_pinned: is_pinned,
                    thumnail: thumnail,
                }, { new: true });
            return { updatedDiscount };
        } catch (err) {
            return { failure: true, message: err.message || "Something went wrong" }
        }
    }

    async delete(id) {
        try {
            const res = await this.discountModel.deleteOne({ _id: id });
            return { result: res.ok, deletedCount: res.deletedCount };
        } catch (err) {
            return { failure: true, message: err.message || "Something went wrong" };
        }
    }

}

module.exports = DiscountDaos;