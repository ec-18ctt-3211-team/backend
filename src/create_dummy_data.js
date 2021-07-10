const mongoose = require("mongoose");
const config = require("../config.json");
//const customerModel = require("./models/customer_model");
const discountModel = require("./models/discount_model");
//const passwordHasher = require("./ultils/password_hasher");

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
  const dummyDiscount = new discountModel({
    discountPrice: 80,
    description: "Discount 80k",
    code: "D80K",
  });

  await dummyDiscount.save();
};
