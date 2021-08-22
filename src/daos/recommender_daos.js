class RecommenderDaos {
  constructor({ recommenderModel }) {
    this.recommenderModel = recommenderModel;
  }

  async create(data) {
    const newRecommender = new this.recommenderModel({...data})
    await newRecommender.save()
    return newRecommender
  }

  async update(id, data) {
    const updatedRecommender = this.recommenderModel.findByIdAndUpdate(id, { ...data }, { new: true })
    return updatedRecommender
  }

  async findOne(id) {
    const recommender = this.recommenderModel.findById(id)
    return recommender
  }
}

module.exports = RecommenderDaos;
