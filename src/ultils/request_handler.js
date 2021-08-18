const axios = require("axios")

module.exports = class MoneyTransfer {
  constructor({}) {}

  async post(url, body) {
    return await axios.post(url, body);
  }
};