class RecommenderDaos {
  constructor({ recommenderModel }) {
    this.recommenderModel = recommenderModel;

    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.getModel = this.getModel.bind(this)
  }

  async create(model) {
    const newRecommender = new this.recommenderModel(model)
    await newRecommender.save()
    return newRecommender;
  }

  async update(id, model) {
    const updatedRecommender = this.recommenderModel.findByIdAndUpdate(id, model, { new: true })
    return updatedRecommender
  }

  async getModel() {
    const recommender = this.recommenderModel.find({})
    return recommender
  }
}

module.exports = RecommenderDaos;
