require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");

const { uncaughtException, unhandledRejection } = require("./utils/utils");
process.on("uncaughtException", uncaughtException);
const server = require("./app");

const handleConnection = (error, DB_INFO) => {
  if (error) return console.log({ "Error in mongoDB": error });
  const { host, name, port } = DB_INFO;
  console.log({ "DB_SUCCESS ON": { host, name, port } });
};

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, handleConnection);

const PORT = process.env.PORT;
server.listen(PORT || 8080, () => console.log(`Server started!`));

process.on("unhandledRejection", (err) => unhandledRejection(err, server));
