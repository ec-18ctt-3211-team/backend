const bcrypt = require("bcrypt");

module.exports = class PasswordHasher {
  constructor() {
    this.hash = this.hash.bind(this);
    this.isMatched = this.isMatched.bind(this);
  }

  async hash(password) {
    const hash = await bcrypt.hash(password, 12);
    return hash;
  }

  async isMatched(a, b) {
    const result = await bcrypt.compare(a, b);
    return result;
  }
};
