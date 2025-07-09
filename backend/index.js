require("dotenv").config();
require("express-async-errors");
const express = require("express");
const authRouter = require("./Routes/Authentication.routes");
const userRouter = require("./Routes/User.routes");
const taskRouter = require("./Routes/Tasks.routes");
const connectDB = require("./db/connect");
const cors = require("cors");
const dbErrorHandler = require("./middleware/dbErrorHandler");
const cookieParser = require("cookie-parser");
const { allowedOrigins } = require("./utils/constants");
const app = express();

//To get data in json format!
app.use(express.json({ extended: false }));

app.use(cookieParser(process.env.JWT_SECRET));

app.use("/uploads", express.static("images"));
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.use(dbErrorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is Running.");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
