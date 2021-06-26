// Main
const awilix = require("awilix");
const App = require("./main/App");
const Server = require("./main/Server");
const Router = require("./main/Router");
const DatabaseConection = require("./main/DBConnection");
// Services
const getCustomerService = require("./services/customer_services/get_customer");
const getAllCustomerService = require("./services/customer_services/get_all_customer");
const updateCustomerService = require("./services/customer_services/update_customer");
// Routes
const customerRoutes = require("./routes/customer_routes")
// Models
const customerModel = require("./models/customer_model");
// Controllers
const customerController = require("./controllers/customer_controllers");
// Daos
const customerDaos = require("./daos/customer_daos");
// Ulti

// Mappers

const container = awilix.createContainer();

container.Customer({
  // main
  app: awilix.asClass(App),
  server: awilix.asClass(Server),
  router: awilix.asFunction(Router),
  database: awilix.asValue(DatabaseConection),

  // services
  getCustomerService: awilix.asClass(getCustomerService),
  getAllCustomerService: awilix.asClass(getAllCustomerService),
  updateCustomerService: awilix.asClass(updateCustomerService),

  // routes
  customerRoutes: awilix.asFunction(customerRoutes),

  // models
  customerModel: awilix.asValue(customerModel),

  //controllers
  customerController: awilix.asClass(customerController),

  // daos
  customerDaos: awilix.asClass(customerDaos),

  // utilities

  // mappers
});

container.register({
  // main
  app: awilix.asClass(App),
  server: awilix.asClass(Server),
  router: awilix.asFunction(Router),
  database: awilix.asValue(DatabaseConection),

  // services

  // routes

  // models

  //controllers

  // daos

  // utilities

  // mappers
});

module.exports = container;
