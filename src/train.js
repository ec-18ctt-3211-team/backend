const mongoose = require("mongoose");
const config = require("../config.json");
const RoomModel = require("./models/room_model")
const recommender = require("./ultils/recommender")

mongoose.connect(config.Database.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("moongose is running");
  // can replace function below with something else more useful for you
  train();
});

const train = async () => {
    const newRecommender = new recommender()
    const rooms = await roomModel.find({});
    const preparedData = recommender.prepareData(rooms);
    await newRecommender.train(preparedData)
    console.log('done')
}

