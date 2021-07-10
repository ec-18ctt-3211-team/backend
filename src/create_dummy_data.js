const mongoose = require("mongoose");
const config = require("../config.json");
const customerModel = require("./models/customer_model");
const passwordHasher = require("./ultils/password_hasher");
const roomModel = require("./models/room_model")

mongoose.connect(config.Database.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("moongose is running");
  // can replace function below with something else more useful for you
  doSth();
});

const doSth = async () => {
  // const passHasher = new passwordHasher();
  // const iuNhiLy = await passHasher.hash("iuNhiLy");
  // const dummyCustomer = new customerModel({
  //   name: "DiHuynh",
  //   email: "baodi@ngocnhi.com",
  //   password: iuNhiLy,
  //   phone: "0783854429",
  // });

  // await dummyCustomer.save();

  // const dummyRoom = new roomModel({
  //   host_id: dummyCustomer._id,
  //   address: {
  //     number: "85/17",
  //     street: "Tran Ke Xuong",
  //     ward: "7",
  //     district: "Phu Nhuan",
  //     city: "Ho Chi Minh"
  //   },
  //   description: "This is a really nice room. Trust me!",
  //   normal_price: 300000,
  //   weekend_price: 400000
  // })

  // await dummyRoom.save();

  const city = "Ho Chi Minh"
  query = await roomModel.find({ 'address.city': city })
  console.log(query);
};
