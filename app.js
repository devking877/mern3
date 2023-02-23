const express = require("express");

const app = express();

const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middlewares

app.use(express.static("./public"));
app.use(express.json());
app.use(errorHandlerMiddleware);

// routes

app.use("/api/v1/tasks", tasks);

app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listning on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
