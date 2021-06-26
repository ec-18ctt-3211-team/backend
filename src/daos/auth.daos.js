class AuthDaos {
  constructor({ customrModel }) {
    this.customrModel = customrModel;

    this.checkEmailDuplicated = this.checkEmailDuplicated.bind(this);
  }

  async checkEmailDuplicated(email) {
    const user = await this.customrModel.findOne({ email });
    return user == null || user == undefined;
  }

  async createNewUser(params) {
    try {
      const user = this.customrModel.new(params);
      newUser.save();
      return { user };
    } catch (err) {
      return { failure: true, message: "Something went wrong" };
    }
  }
}
