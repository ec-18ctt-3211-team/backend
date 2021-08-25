const ContentBasedRecommender = require('content-based-recommender')
const mongoose = require('mongoose')

class Recommender {
    constructor({ recommenderDaos, roomDaos, lastChoiceModel }) {
        this.recommenderDaos = recommenderDaos
        this.roomDaos = roomDaos
        this.lastChoiceModel = lastChoiceModel

        this.train = this.train.bind(this)
        this.predict = this.predict.bind(this)
        this.prepareData = this.prepareData.bind(this)
    }

    async train(data) {
        const model = await this.recommenderDaos.getModel()
        if (model.lengt > 0) {
            const recommender = new ContentBasedRecommender()
            recommender.import(model[0])
            recommender.train(data)
            await this.recommenderDaos.update(model._id, recommender.export())
        } else {
            const recommender = new ContentBasedRecommender({
              minScore: 0.1,
              maxSimilarDocuments: 100
            });
            recommender.train(data)
            await this.recommenderDaos.create(recommender.export())
        }
    }

    async predict(customer_id) {
        const recommender = new ContentBasedRecommender()
        const model = await this.recommenderDaos.getModel()
        const lastChoice = await this.lastChoiceModel.findOne({ customer_id })
        if (!lastChoice) {
            return await this.roomDaos.getAll({ limit: 10, page: 1 })
        } else {
            recommender.import(model[0])
            const ids = recommender.getSimilarDocuments(lastChoice.room_id.toString())
            ids = ids.map(id => {
                return new mongoose.Types.ObjectId(id);
            })
            return await this.roomDaos.getByArrayId(ids);
        }
    }

    prepareData(mongooseObjects) {
        return mongooseObjects.map(row => {
            const content = `${row.host_id} ${row.title} ${row.address.city} ${row.description}`
            return { id: row._id, content: content }
        })
    }
}

module.exports = Recommender