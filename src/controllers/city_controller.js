class CityController {
    constructor(
        {
            getAllCitysService,
            getCityByIdService,
            getCityIsPinnedService,
            createCityService,
            updateCityService
        }) {
        this.getAllCitysService = getAllCitysService;
        this.getCityByIdService = getCityByIdService;
        this.getCityIsPinnedService = getCityIsPinnedService;
        this.createCityService = createCityService;
        this.updateCityService = updateCityService;

        this.index = this.index.bind(this);
        this.indexPinned = this.indexPinned.bind(this);
        this.show = this.show.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
    }

    async index(req, res) {
        try {
            const params = { ...req.query };
            const serviceResult = await this.getAllCitysService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({
                valid: true,
                citys: serviceResult.citys,
                total: serviceResult.total,
            });
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message });
        }
    }

    async indexPinned(req, res) {
        try {
            const params = { ...req.query };
            const serviceResult = await this.getCityIsPinnedService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({
                valid: true,
                citys: serviceResult.citys,
                total: serviceResult.total,
            });
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message });
        }
    }

    async show(req, res) {
        try {
            const params = { ...req.params };
            const serviceResult = await this.getCityByIdService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({
                valid: true,
                city: serviceResult,
            });
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message });
        }
    }

    async create(req, res) {
        try {
            const params = { ...req.body };
            const serviceResult = await this.createCityService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message)
            res.status(200).send({ valid: true, newCity: serviceResult.newCity })
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message })
        }
    }

    async update(req, res) {
        try {
            const params = { ...req.params, ...req.body };
            const serviceResult = await this.updateCityService.execute(params);
            console.log(serviceResult);
            if (serviceResult.failure) throw new Error(serviceResult.message)
            res.status(200).send({ valid: true, updatedCity: serviceResult })
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message })
        }
    }
}

module.exports = CityController;