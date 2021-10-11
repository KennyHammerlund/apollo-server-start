/**
 * GLOBAL PACKAGES REQUIRED TO BE AT ENTRY POINT
 */
const path = require("path");

const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { loadSchemaSync } = require("@graphql-tools/load");
const { mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

const resolversArray = loadFilesSync(
  path.join(__dirname, "/resolvers/**/*.js")
);

const schema = loadSchemaSync(path.join(__dirname, "/typedefs/**/*.graphql"), {
  loaders: [new GraphQLFileLoader()],
  resolvers: mergeResolvers(resolversArray),
});

module.exports = { schema };
