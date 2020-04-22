const express = require("express");
const dotenv = require("dotenv");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

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
