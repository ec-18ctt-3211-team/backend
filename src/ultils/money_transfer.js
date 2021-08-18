const config = require("../../config.json")

module.exports = class MoneyTransfer {
  constructor({ requestHandler }) {
    this.requestHandler = requestHandler;

    this.send = this.send.bind(this);
  }

  async send(amount, client) {
    const METHOD = "MassPay";
    const RECEIVERTYPE = "EmailAddress";
    const CURRENCYCODE = "USD";

    const params = new URLSearchParams();
    params.append('USER', config.paypal.ADMIN_EMAIL);
    params.append('PWD', config.paypal.ADMIN_PWD);
    params.append('SIGNATURE', config.paypal.ADMIN_SIGNATURE);
    params.append('METHOD', METHOD);
    params.append('VERSION', config.paypal.VERSION);
    params.append('RECEIVERTYPE', RECEIVERTYPE);
    params.append('CURRENCYCODE', CURRENCYCODE);
    params.append('L_EMAIL0', client);
    params.append('L_AMT0', amount);
    const url = `${config.paypal.URL}?${params.toString()}`;

    return await this.requestHandler.post(url, {});
  }
};