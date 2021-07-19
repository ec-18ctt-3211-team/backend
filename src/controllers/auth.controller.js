class AuthController {
  constructor({ registerService, loginService }) {
    this.registerService = registerService;
    this.loginService = loginService;

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req, res) {
    try {
      // POST
      const params = req.body;
      const serviceResult = await this.registerService.execute(params);
      if (serviceResult.failure) throw new Error(serviceResult.message);
      res.status(200).send({ valid: true, newUser: serviceResult.user });
    } catch (err) {
      res.status(400).send({ valid: false, message: err.message });
    }
  }

  async login(req, res) {
    try {
      const params = req.body;
      const serviceResult = await this.loginService.execute(params);
      if (serviceResult.failure) throw new Error(serviceResult.message);
      res.status(200).header("token", serviceResult.token).send({
        valid: true,
        userId: serviceResult.userId,
        name: serviceResult.name,
        ava: serviceResult.ava,
        host: serviceResult.host,
      });
    } catch (err) {
      res.status(400).send({ valid: false, message: err.message });
    }
  }
}

module.exports = AuthController;
