const express = require("express");
const graphqlHTTP = require("express-graphql");

const app = express();

/**
 * middleware for graphql ui
 * type: function
 * args: {
 * schema: object,
 * }
 */

app.use('/graphql',graphqlHTTP({

}))

const PORT = 4000;
app.listen(PORT, () => {
  console.log("app running on port ${PORT}");
});
