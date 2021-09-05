class AuthLogin {
  constructor({ authDaos, authentication }) {
    this.authDaos = authDaos;
    this.authentication = authentication;
  }

  async execute(params) {
    const { email, password } = params;
    const user = await this.authDaos.findByEmail(email);
    if (user.failure) {
      return {
        failure: true,
        message: "Invalid username/password",
      };
    }
    const checkPassword = await this.authentication.isMatched(
      password,
      user.password
    );
    if (!checkPassword) {
      return {
        failure: true,
        message: "Invalid username/password",
      };
    }
    const stringUser =
      user.email +
      user.name +
      user.phone +
      user.ava +
      user.email_paypal +
      user.ci;
    let step_up = false;
    if (user.ci && user.email_paypal) {
      step_up = true;
    }

    return {
      token: this.authentication.sign(stringUser),
      userId: user.id,
      name: user.name,
      ava: user.ava,
      host: user.is_host,
      step_up: step_up
    };
  }
}

module.exports = AuthLogin;
