class AuthDaos {
  constructor({ customerModel }) {
    this.customerModel = customerModel;

    this.checkEmailDuplicated = this.checkEmailDuplicated.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
    this.findByEmail = this.findByEmail.bind(this);
  }

  async checkEmailDuplicated(email) {
    const user = await this.customerModel.findOne({ email });
    return user == null || user == undefined;
  }

  async createNewUser(params) {
    try {
      const user = await this.customerModel.insertMany({ ...params });
      if (!user) throw "Register new user failed!";
      return { user };
    } catch (err) {
      return { failure: true, message: err.message };
    }
  }

  async findByEmail(email) {
    try {
      const user = await this.customerModel.findOne({ email });
      if (!user) throw new Error("Email was not found!");
      return user;
    } catch (err) {
      return { failure: true, message: err.message }
    }
  }
}

module.exports = AuthDaos;
