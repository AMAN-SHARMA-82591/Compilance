require("dotenv").config();
require("express-async-errors");
const express = require("express");
const authRouter = require("./Routes/Authentication");
const userRouter = require("./Routes/User");
const taskRouter = require("./Routes/Tasks");
const connectDB = require("./db/connect");
const app = express();

//To get data in json format!
app.use(express.json({ extended: false }));
app.use("/uploads", express.static("images"));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({ message: "Something went wrong!!" });
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

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
