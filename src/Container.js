// Main
const awilix = require("awilix");
const App = require("./main/App");
const Server = require("./main/Server");
const Router = require("./main/Router");
const DatabaseConection = require("./main/DBConnection");
const registerService = require("./services/auth_services/register");
// Services
const getCustomerService = require("./services/customer_services/get_customer");
const getAllCustomerService = require("./services/customer_services/get_all_customer");
const updateCustomerService = require("./services/customer_services/update_customer");
const registerService = require("./services/auth_services/register");
// Routes
const customerRoutes = require("./routes/customer_routes")
const authRoutes = require("./routes/auth.routes");
// Models
const customerModel = require("./models/customer_model");
// Controllers
const customerController = require("./controllers/customer_controllers");
const authController = require("./controllers/auth.controller");
// Daos
const customerDaos = require("./daos/customer_daos");
const authDaos = require("./daos/auth.daos");
// Ulti
const passwordHasher = require("./ultils/password_hasher");
const { pass } = require("./main/DBConnection");
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
  registerService: awilix.asClass(registerService),

  // routes
  authRoutes: awilix.asFunction(authRoutes),

  // models
  customerModel: awilix.asValue(customerModel),

  //controllers
  authController: awilix.asClass(authController),

  // daos
  authDaos: awilix.asClass(authDaos),

  // utilities
  passwordHasher: awilix.asClass(passwordHasher),

  // mappers
});

module.exports = container;
