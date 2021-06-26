// Main
const awilix = require("awilix");
const App = require("./main/App");
const Server = require("./main/Server");
const Router = require("./main/Router");
const DatabaseConection = require("./main/DBConnection");
// Services
const registerService = require("./services/auth_services/register");
// Routes
const authRoutes = require("./routes/auth.routes");
// Models
const customerModel = require("./models/customer_model");
// Controllers
const authController = require("./controllers/auth.controller");
// Daos
const authDaos = require("./daos/auth.daos");
// Ulti
const passwordHasher = require("./ultils/password_hasher");
const { pass } = require("./main/DBConnection");
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
