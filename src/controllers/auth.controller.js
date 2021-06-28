class AuthController {
  constructor({ registerService }) {
    this.registerService = registerService;

    this.register = this.register.bind(this);
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
}

module.exports = AuthController;
