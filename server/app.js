const express = require("express");
const dotenv = require("dotenv");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.once("open", () => {
  console.log("connected to db");
});
/**
 * middleware for graphql ui
 * type: function
 * args: {
 * schema: object,
 * }
 */

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
