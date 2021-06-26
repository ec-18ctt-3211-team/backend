class AuthRegister {
  constructor({ authDaos, passwordHasher }) {
    this.authDaos = authDaos;
    this.passwordHasher = passwordHasher;

    this.execute = this.execute.bind(this);
  }

  async execute(params) {
    const { email, name, password, phone } = params;
    const checkEmailDup = await this.authDaos.checkEmailDuplicated(email);
    if (!checkEmailDup) {
      return {
        failure: true,
        message: "This email has been registered before",
      };
    }
    const hashedPassword = await this.passwordHasher.hash(password);
    const daosResult = this.authDaos.createNewUser({
      email,
      name,
      password: hashedPassword,
      phone,
    });
    return daosResult;
  }
}

module.exports = AuthRegister;
