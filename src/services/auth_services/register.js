const Customer = require("../../models/customer_model");
class AuthRegister {
  constructor({ authDaos }) {
    this.authDaos = authDaos;

    this.execute = this.execute.bind(this);
  }

  async execute(params) {
    const { email, name, password, phone } = params;
  }
}
