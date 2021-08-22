const ContentBasedRecommender = require('content-based-recommender')

class Recommender {
    constructor({ recommenderDaos, roomsDaos }) {
        this.recommenderDaos = recommenderDaos
        this.roomsDaos = roomsDaos
    }

    async train(id, data) {
        const object = await this.recommenderDaos.findOne(id)
        let recommender;
        if (object) {
            recommender = new ContentBasedRecommender()
            recommender.import(object)
        } else {
            recommender = new ContentBasedRecommender({
              minScore: 0.1,
              maxSimilarDocuments: 100
            });
        }
        return recommender.train(data)
    }

    async predict(id) {
        const recommender = new ContentBasedRecommender()
        const object = await this.recommenderDaos.findOne(id)
        if (!object) return [];
        const ids = recommender.getSimilarDocuments(id.toString())
    }

    prepareData(mongooseObjects) {
        const preparedData = mongooseObjects.map(row => {
            const content = `${row.host_id} ${row.title} ${row.address.city} ${row.description}`
            return {
                id: row._id, content: content
            }
        })

        return preparedData
    }
}

