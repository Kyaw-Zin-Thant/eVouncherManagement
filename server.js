const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const glob = require("glob");
const path = require("path");
const { checkToken } = require("./middlewares/middleware.controller");
let server = require("http").Server(app);
const { config } = require("./config/config");
const { errorHandler } = require("./services/error.handler.service");
//db connected
mongoose.Promise = global.Promise;
const { dbName, user, pass } = config.db;
const mongooseOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(
  `mongodb+srv://${user}:${pass}@cluster0.8msix.mongodb.net/${dbName}?retryWrites=true&w=majority`,
  mongooseOption
);

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error:${err}`);
});
mongoose.connection.on("connected", (err) => {
  console.log(`DB connected`);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "AUTHORIZATION, Origin, X-Requested-With, Content-Type, Accept, USERNAME, PASSWORD, APIKEY, SECRETKEY, API_KEY, SECRET_KEY, OWNERID, BookID, File,USERACCESSTOKEN"
  );
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  res.setHeader("Expires", "0");
  next();
});

//miidleware
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(checkToken);
app.use((err, req, res, next) => {
  try {
    const { statusCode = 500, message = "Something Went Wrong!" } = err;
    res.status(statusCode).json({ message });
  } catch (e) {
    res.status(500).json(e);
  }
});

app.use("/public", express.static(path.resolve(__dirname, "public")));
app.use("/asset", express.static(path.join(__dirname, "asset")));
// error handling

const routes = glob.sync("./routes/*.js");
routes.forEach((route) => {
  console.log(route);
  require(route).default(app);
});
app.use(errorHandler);
app.set("trust proxy", true);
app.set("view engine", "ejs");
server.listen(7003, () => {
  console.log(
    `A Vouncher Api Start Running at port `,
    process.env.PORT || 7003
  );
});
