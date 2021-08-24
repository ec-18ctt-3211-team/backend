class CityController {
    constructor(
        {
            getAllCitiesService,
            getCityByIdService,
            getCityIsPinnedService,
            createCityService,
            updateCityService,
            deleteCityService
        }) {
        this.getAllCitiesService = getAllCitiesService;
        this.getCityByIdService = getCityByIdService;
        this.getCityIsPinnedService = getCityIsPinnedService;
        this.createCityService = createCityService;
        this.updateCityService = updateCityService;
        this.deleteCityService = deleteCityService;

        this.index = this.index.bind(this);
        this.pinned = this.pinned.bind(this);
        this.show = this.show.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async index(req, res) {
        try {
            const params = { ...req.query };
            const serviceResult = await this.getAllCitiesService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({
                valid: true,
                cities: serviceResult.cities,
                total: serviceResult.total,
            });
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message });
        }
    }

    async pinned(req, res) {
        try {
            const serviceResult = await this.getCityIsPinnedService.execute();
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({
                valid: true,
                cities: serviceResult.cities,
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
                city: serviceResult.city,
            });
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message });
        }
    }

    async create(req, res) {
        try {
            const params = { ...req.body, thumnail: `/${req.filename}` };
            const serviceResult = await this.createCityService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message)
            res.status(200).send({ valid: true, newCity: serviceResult.newCity })
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message })
        }
    }

    async update(req, res) {
        try {
            const params = { ...req.params, ...req.body, thumnail: `/${req.filename}`  };
            const serviceResult = await this.updateCityService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message)
            res.status(200).send({ valid: true, updatedCity: serviceResult.updatedCity })
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message })
        }
    }

    async delete(req, res) {
        try {
            const params = { ...req.params };
            const serviceResult = await this.deleteCityService.execute(params);
            if (serviceResult.failure) throw new Error(serviceResult.message);
            res.status(200).send({
                valid: true,
                city: serviceResult.city,
            });
        } catch (err) {
            res.status(400).send({ valid: false, message: err.message });
        }
    }
}

module.exports = CityController;
