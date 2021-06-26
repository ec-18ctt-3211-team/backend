class AuthController {
  constructor({ registerService }) {
    this.registerService = registerService;

    this.register = this.register.bind(this);
  }

  async register(req, res) {
    try {
      // POST
      const params = req.body;
      const serviceResult = this.registerService.execute(params);
      if (serviceResult.failure) throw serviceResult.message;
      res.status(200).send({ valid: true, newUser: serviceResult.user });
    } catch (err) {
      res.send({ valid: false, message: err.message });
    }
  }
}
