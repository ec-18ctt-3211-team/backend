const Customer = require("../../models/customer_model");

class Register {
  constructor({ authDaos, passwordHasher }) {
    this.authDaos = authDaos;
    this.passwordHasher = passwordHasher;
  }

  async execute(params) {
    const { email, name, password, phone } = params;
    const checkDuplicatedEmail = authDaos.checkDupicatedEmail(email);
    if (!checkDuplicatedEmail) {
      return {
        failure: true,
        message: "This email has already been registered",
      };
    }
    const hashedPassword = this.passwordHasher.hash(password);
    const daosResult = this.authDaos.register({
      email,
      name,
      password: hashedPassword,
      phone,
    });
  }
}

module.exports = Register;
