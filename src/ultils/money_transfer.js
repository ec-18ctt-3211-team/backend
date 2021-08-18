const config = require("../../config.json")

module.exports = class MoneyTransfer {
  constructor({ requestHandler }) {
    this.requestHandler = requestHandler;

    this.isMatched = this.isMatched.bind(this);
  }

  async send(amount, client) {
    const payload = {
      USER: config.paypal.ADMIN_EMAIL,
      PWD: config.paypal.ADMIN_PWD,
      SIGNATURE: config.paypal.ADMIN_SIGNATURE,
      METHOD: "MassPay",
      VERSION: config.paypal.VERSION,
      RECEIVERTYPE: "EmailAddress",
      CURRENCYCODE: "USD",
      L_EMAIL0: client,
      L_AMT0: amount
    }
    return await this.requestHandler.post(config.paypal.URL, payload);
  }
};