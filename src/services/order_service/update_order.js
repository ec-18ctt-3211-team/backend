class UpdateOrder {
  constructor({ orderDaos, moneyTransfer, customerDaos }) {
    this.orderDaos = orderDaos;
    this.moneyTransfer = moneyTransfer;
    this.customerDaos = customerDaos;

    this.execute = this.execute.bind(this);
  }
  async execute(params) {
    try {
      const daosResult = await this.orderDaos.update(params);
      if (!daosResult.failure && daosResult.updatedOrder.status == "accepted") {
        const updatedOrder = daosResult.updatedOrder;
        const host = await this.customerDaos.getById(updatedOrder.host_id);
        if (!host.email_paypal) throw new Error('Host does not have paypal_email');
        const res = await this.moneyTransfer.send(updatedOrder.price, host.email_paypal);
      }
      return daosResult;
    } catch (error) {
      return { failure: true, message: error.message };
    }
  }
}

module.exports = UpdateOrder;