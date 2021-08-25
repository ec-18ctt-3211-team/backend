const mongoose = require("mongoose");
const config = require("../../config.json");

mongoose.connect(config.Database.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.set('useFindAndModify', false);

module.exports = mongoose.connection.once("open", () => {
  // eslint-disable-next-line no-console
  console.log("moongose is running");
});