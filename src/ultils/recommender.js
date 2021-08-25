const ContentBasedRecommender = require('content-based-recommender')
const mongoose = require('mongoose')

class Recommender {
    constructor({ roomDaos, lastChoiceModel }) {
        this.roomDaos = roomDaos
        this.lastChoiceModel = lastChoiceModel

        this.predict = this.predict.bind(this)
        this.prepareData = this.prepareData.bind(this)
    }

    async predict(customer_id) {
        const lastChoice = await this.lastChoiceModel.findOne({ customer_id })
        if (!lastChoice) {
            return await this.roomDaos.getAll({ limit: 10, page: 1 })
        } else {
            const result = await this.roomDaos.getAll();
            const rooms = result.rooms;
            const data = this.prepareData(rooms);

            const recommender = new ContentBasedRecommender({
                minScore: 0.1,
                maxSimilarDocuments: 100
              });
            recommender.train(data)
            let ids = recommender.getSimilarDocuments(lastChoice.room_id.toString(), 0, 8)
            ids = ids.map(id => {
                return new mongoose.Types.ObjectId(id.id);
            })
            return await this.roomDaos.getByArrayId(ids);
        }
    }

    prepareData(mongooseObjects) {
        return mongooseObjects.map(row => {
            const content = `${row.host_id} ${row.title} ${row.address.city} ${row.description}`
            return { id: row._id.toString(), content: content }
        })
    }
}

module.exports = Recommender