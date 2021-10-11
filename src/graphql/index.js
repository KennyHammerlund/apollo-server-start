/**
 * GLOBAL PACKAGES REQUIRED TO BE AT ENTRY POINT
 */
const path = require("path");
require("module-alias/register");
require("dotenv").config({ path: path.resolve(__dirname, `../../.env`) });

// const winstonLogger = require("./plugins/winstonLogger");
const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const context = require("./context");
const { schema } = require("./schema");
const { getSequelize } = require("../models/connection");

const server = new ApolloServer({
  schema,
  tracing: true,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
    // winstonLogger(logger),
  ],
  context: context,
  dataSources: async () => {
    const rdb = await await getSequelize();
    return { rdb };
  },
});
const port = process.env.NODE_ENV !== "production" ? 3333 : undefined;
server.listen({ port }).then(({ url }) => {
  // eslint-disable-next-line
  console.log(`🚀 Server ready at ${url}`);
  // init the db so its connected for the first query
  // eslint-disable-next-line
  // **** SEQUELIZE ******
  // When connecting to a DB add db creds to env and uncomment the next line
  // getSequelize();
});

// export schema for testing
module.exports = { schema };
