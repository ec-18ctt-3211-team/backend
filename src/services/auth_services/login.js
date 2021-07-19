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
                message: "Your email does not exist",
            };
        }
        const checkPassword = await this.authentication.isMatched(password, user.password);
        if (!checkPassword) {
            return {
                failure: true,
                message: "Your password was wrong",
            };
        }
        const stringUser = user.email + user.name + user.phone
            + user.ava + user.payment_number + user.ci;
        return {
            token: this.authentication.sign(stringUser),
            userId: user.id,
            name: user.name,
            ava: user.ava,
            host: user.is_host,
        };
    }
}

module.exports = AuthLogin;