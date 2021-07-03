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
const registerService = require("./services/auth_services/register");
// Routes
const authRoutes = require("./routes/auth.routes");
const customerRoutes = require("./routes/customer_routes")
// Models
const customerModel = require("./models/customer_model");
// Controllers
const authController = require("./controllers/auth.controller");
const customerController = require("./controllers/customer_controllers");
// Daos
const customerDaos = require("./daos/customer_daos");
const authDaos = require("./daos/auth.daos");
// Ulti
const passwordHasher = require("./ultils/password_hasher");
// Mappers

const container = awilix.createContainer();

container.register({
  // main
  app: awilix.asClass(App),
  server: awilix.asClass(Server),
  router: awilix.asFunction(Router),
  database: awilix.asValue(DatabaseConection),

  // services
  registerService: awilix.asClass(registerService),
  getCustomerService: awilix.asClass(getCustomerService),
  getAllCustomerService: awilix.asClass(getAllCustomerService),
  updateCustomerService: awilix.asClass(updateCustomerService),


  // routes
  authRoutes: awilix.asFunction(authRoutes),
  customerRoutes: awilix.asFunction(customerRoutes),


  // models
  customerModel: awilix.asValue(customerModel),

  //controllers
  authController: awilix.asClass(authController),
  customerController: awilix.asClass(customerController),

  // daos
  authDaos: awilix.asClass(authDaos),
  customerDaos: awilix.asClass(customerDaos),

  // utilities
  passwordHasher: awilix.asClass(passwordHasher),

  // mappers
});

module.exports = container;
