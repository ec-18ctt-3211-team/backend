class CreateOrder {
  constructor({ orderDaos, lastChoiceModel }) {
    this.orderDaos = orderDaos;
    this.lastChoiceModel = lastChoiceModel;

    this.execute = this.execute.bind(this);
  }
  async execute(params) {
    try {
      const { customer_id } = params;
      if (customer_id) {
        const result = await this.lastChoiceModel.findOneAndUpdate(
          { customer_id },
          { room_id: serviceResult.room._id }
        );
        if (!result) {
          const newChoice = new this.lastChoiceModel({
            customer_id,
            room_id: params.id,
          });
          await newChoice.save();
        }
      }
      const daosResult = await this.orderDaos.create(params);
      return daosResult;
    } catch (error) {
      return { failure: true, message: error.message };
    }
  }
}

module.exports = CreateOrder;
