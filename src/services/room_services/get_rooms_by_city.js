class getRoomsByCity {
  constructor({ authDaos, passwordHasher }) {
    this.authDaos = authDaos;
    this.passwordHasher = passwordHasher;

    this.execute = this.execute.bind(this);
  }

  async execute(params) {
    const { city,  } = params;
    
  }
}

module.exports = AuthRegister;
