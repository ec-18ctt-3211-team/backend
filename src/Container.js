// Main
const awilix = require("awilix");
const App = require("./main/App");
const Server = require("./main/Server");
const Router = require("./main/Router");
const DatabaseConection = require("./main/DbConnection");
// Services
const getCustomerService = require("./services/customer_services/get_customer");
const getAllCustomerService = require("./services/customer_services/get_all_customer");
const updateCustomerService = require("./services/customer_services/update_customer");
const registerService = require("./services/auth_services/register");
const getRoomByIdService = require("./services/room_services/get_room_by_id");
const getRoomsService = require("./services/room_services/get_rooms");
const getRoomByCustomerService = require("./services/customer_services/get_rooms_by_customer");
const loginService = require("./services/auth_services/login");
const getAllOrdersService = require("./services/order_service/get_all_orders")
const getAllOrdersByCustomerIdService = require("./services/order_service/get_all_orders_by_customer_id");
const createOrderService = require("./services/order_service/create_order")
const updateOrderService = require("./services/order_service/update_order")
const getAllCitiesService = require("./services/city_services/get_all_cities");
const getCityIsPinnedService = require("./services/city_services/get_city_is_pinned");
const getCityByIdService = require("./services/city_services/get_city_by_id");
const createCityService = require("./services/city_services/create_city");
const updateCityService = require("./services/city_services/update_city");
const getAllDiscountService = require("./services/discount_service/get_all_discount");
const getAllDiscounIsPinnedService = require("./services/discount_service/get_all_discount_is_pinned");
const getAllDiscountByCustomerIdService = require("./services/discount_service/get_all_discount_by_customer_id");
const getDiscountByIdService = require("./services/discount_service/get_discount_by_id");
const createDiscountService = require("./services/discount_service/create_discount");
const applyDiscountService = require("./services/discount_service/apply_discount");
const updateDiscountService = require("./services/discount_service/update_discount");
const deleteDiscountService = require("./services/discount_service/delete_discount");
// Routes
const authRoutes = require("./routes/auth_routes");
const roomRoutes = require("./routes/room_routes");
const customerRoutes = require("./routes/customer_routes");
const discountRoutes = require("./routes/discount_routes");
const orderRoutes = require("./routes/order_routes")
const cityRoutes = require("./routes/city_routes");
// Models
const customerModel = require("./models/customer_model");
const bookingDateModel = require("./models/booking_date_model");
const extraPriceModel = require("./models/extra_price_model");
const photoModel = require("./models/photo_model");
const roomModel = require("./models/room_model");
const discountModel = require("./models/discount_model");
const orderModel = require("./models/order_model")
const cityModel = require("./models/city_model");
const appliedDiscountModel = require("./models/applied_discount_model");
// Controllers
const authController = require("./controllers/auth_controller");
const roomController = require("./controllers/room_controller");
const customerController = require("./controllers/customer_controllers");
const discountController = require("./controllers/discount_controller");
const orderController = require("./controllers/order_controller")
const cityController = require("./controllers/city_controller");
// Daos
const authDaos = require("./daos/auth_daos");
const roomDaos = require("./daos/room_daos");
const customerDaos = require("./daos/customer_daos");
const photoDaos = require("./daos/photo_daos");
const extraPriceDaos = require("./daos/extra_price_daos");
const bookingDateDaos = require("./daos/booking_date_daos");
const orderDaos = require("./daos/order_daos")
const cityDaos = require("./daos/city_daos");
const discountDaos = require("./daos/discount_daos");
const appliedDiscountDaos = require("./daos/applied_discount_daos");
// Ulti
const passwordHasher = require("./ultils/password_hasher");
const authentication = require("./ultils/authentication");
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
  getRoomsService: awilix.asClass(getRoomsService),
  getCustomerService: awilix.asClass(getCustomerService),
  getAllCustomerService: awilix.asClass(getAllCustomerService),
  updateCustomerService: awilix.asClass(updateCustomerService),
  getRoomByCustomerService: awilix.asClass(getRoomByCustomerService),
  loginService: awilix.asClass(loginService),
  getAllOrdersService: awilix.asClass(getAllOrdersService),
  getAllOrdersByCustomerIdService: awilix.asClass(getAllOrdersByCustomerIdService),
  createOrderService: awilix.asClass(createOrderService),
  updateOrderService: awilix.asClass(updateOrderService),
  getAllCitiesService: awilix.asClass(getAllCitiesService),
  getCityIsPinnedService: awilix.asClass(getCityIsPinnedService),
  getCityByIdService: awilix.asClass(getCityByIdService),
  createCityService: awilix.asClass(createCityService),
  updateCityService: awilix.asClass(updateCityService),
  getAllDiscountService: awilix.asClass(getAllDiscountService),
  getAllDiscounIsPinnedService: awilix.asClass(getAllDiscounIsPinnedService),
  getAllDiscountByCustomerIdService: awilix.asClass(getAllDiscountByCustomerIdService),
  getDiscountByIdService: awilix.asClass(getDiscountByIdService),
  createDiscountService: awilix.asClass(createDiscountService),
  applyDiscountService: awilix.asClass(applyDiscountService),
  updateDiscountService: awilix.asClass(updateDiscountService),
  deleteDiscountService: awilix.asClass(deleteDiscountService),

  // routes
  authRoutes: awilix.asFunction(authRoutes),
  roomRoutes: awilix.asFunction(roomRoutes),
  customerRoutes: awilix.asFunction(customerRoutes),
  discountRoutes: awilix.asFunction(discountRoutes),
  orderRoutes: awilix.asFunction(orderRoutes),
  cityRoutes: awilix.asFunction(cityRoutes),

  // models
  customerModel: awilix.asValue(customerModel),
  bookingDateModel: awilix.asValue(bookingDateModel),
  extraPriceModel: awilix.asValue(extraPriceModel),
  photoModel: awilix.asValue(photoModel),
  roomModel: awilix.asValue(roomModel),
  orderModel: awilix.asValue(orderModel),
  cityModel: awilix.asValue(cityModel),
  discountModel: awilix.asValue(discountModel),
  appliedDiscountModel: awilix.asValue(appliedDiscountModel),

  //controllers
  authController: awilix.asClass(authController),
  roomController: awilix.asClass(roomController),
  customerController: awilix.asClass(customerController),
  discountController: awilix.asClass(discountController),
  orderController: awilix.asClass(orderController),
  cityController: awilix.asClass(cityController),

  // daos
  authDaos: awilix.asClass(authDaos),
  roomDaos: awilix.asClass(roomDaos),
  customerDaos: awilix.asClass(customerDaos),
  photoDaos: awilix.asClass(photoDaos),
  extraPriceDaos: awilix.asClass(extraPriceDaos),
  bookingDateDaos: awilix.asClass(bookingDateDaos),
  orderDaos: awilix.asClass(orderDaos),
  cityDaos: awilix.asClass(cityDaos),
  discountDaos: awilix.asClass(discountDaos),
  appliedDiscountDaos: awilix.asClass(appliedDiscountDaos),

  // utilities
  passwordHasher: awilix.asClass(passwordHasher),
  authentication: awilix.asClass(authentication),

  // mappers
});

module.exports = container;
