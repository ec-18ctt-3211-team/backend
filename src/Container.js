// Main
const awilix = require("awilix");
const App = require("./main/App");
const Server = require("./main/Server");
const Router = require("./main/Router");
const DatabaseConection = require("./main/DBConnection");
// Services
const registerService = require("./services/auth_services/register");
const getRoomByIdService = require("./services/room_services/get_room_by_id");
const getRoomsByCityService = require("./services/room_services/get_rooms_by_city");
// Routes
const authRoutes = require("./routes/auth_routes");
const roomRoutes = require("./routes/room_routes");
// Models
const customerModel = require("./models/customer_model");
const bookingDateModel = require("./models/booking_date_model");
const extraPriceModel = require("./models/extra_price_model");
const photoModel = require("./models/photo_model");
const roomModel = require("./models/room_model");
// Controllers
const authController = require("./controllers/auth_controller");
const roomController = require("./controllers/room_controller");
// Daos
const authDaos = require("./daos/auth_daos");
const roomDaos = require("./daos/room_daos");
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
  getRoomByIdService: awilix.asClass(getRoomByIdService),
  getRoomsByCityService: awilix.asClass(getRoomsByCityService),

  // routes
  authRoutes: awilix.asFunction(authRoutes),
  roomRoutes: awilix.asFunction(roomRoutes),

  // models
  customerModel: awilix.asValue(customerModel),
  bookingDateModel: awilix.asValue(bookingDateModel),
  extraPriceModel: awilix.asValue(extraPriceModel),
  photoModel: awilix.asValue(photoModel),
  roomModel: awilix.asValue(roomModel),

  //controllers
  authController: awilix.asClass(authController),
  roomController: awilix.asClass(roomController),

  // daos
  authDaos: awilix.asClass(authDaos),
  roomDaos: awilix.asClass(roomDaos),

  // utilities
  passwordHasher: awilix.asClass(passwordHasher),

  // mappers
});

module.exports = container;
