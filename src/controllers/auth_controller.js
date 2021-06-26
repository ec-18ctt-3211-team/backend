class AuthController {
  constructor({ registerService }) {
    this.registerService = registerService;
  }

  async register(req, res) {
    try {
      const params = req.body;
      const serviceResult = await this.registerService.execute(params);
      if (serviceResult.failure) throw serviceResult.message;
      res.status(200).send({ valid: true, newUser: serviceResult.user });
    } catch (err) {
      res.status(404).send({ valid: false, message: err.message });
    }
  }
}
