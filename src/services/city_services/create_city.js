class CreateCity {
    constructor({ cityDaos }) {
        this.cityDaos = cityDaos;

        this.execute = this.execute.bind(this);
    }

    async execute(params) {
        try {
            const daosResult = this.cityDaos.create(params);
            return daosResult;
        } catch (err) {
            return { falture: true, message: err.message };
        }
    }

}

module.exports = CreateCity;
