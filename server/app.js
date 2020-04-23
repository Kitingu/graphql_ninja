const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());

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
