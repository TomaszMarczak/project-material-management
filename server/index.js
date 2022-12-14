const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db");
const morgan = require("morgan");
const schema = require("./schema/schema");
const port = process.env.PORT || 5000;

const app = express();

connectDB();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);
app.use(morgan("dev"));
app.listen(
  port,
  console.log(
    `Server running on port ${port}. Visit http://localhost:${port}/graphql`
  )
);
