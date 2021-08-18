class DeleteDiscount {
    constructor({ discountDaos, appliedDiscountDaos }) {
        this.discountDaos = discountDaos;
        this.appliedDiscountDaos = appliedDiscountDaos;

        this.execute = this.execute.bind(this);
    }

    async execute(params) {
        try {
            const { id } = params;
            const discountDaosResult = await this.discountDaos.delete(id);
            if (discountDaosResult.failure || discountDaosResult.deletedCount == 0) throw new Error(
                discountDaosResult.message || "delete discount failed because discount Id is not exist"
            );
            const discount = { 
                message: " delete discount successfully.", 
                deletedCount: discountDaosResult.deletedCount
            }

            const appliedDiscountDaosResult = await this.appliedDiscountDaos.delete(id);
            if (appliedDiscountDaosResult.failure) throw new Error(appliedDiscountDaosResult.message);
            const appliedDiscount = { 
                message: " delete applied discount successfully.", 
                deletedCount: appliedDiscountDaosResult.deletedCount
            }    

            return { discount, appliedDiscount };
        } catch (err) {
            return { failure: true, message: err.message };
        }
    }

}

module.exports = DeleteDiscount;
