const { ValidationError } = require("apollo-server");
const { GraphQLScalarType, Kind } = require("graphql");
const moment = require("moment");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    if (!Date.parse(value))
      throw new ValidationError(
        "The Date provided is not valid: see Date.parse MDN docs for more info"
      );
    return moment(value).utc().format(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    if (!Date.parse(value))
      throw new ValidationError(
        "The Date provided is not valid: see Date.parse MDN docs for more info"
      );
    return moment(value).utc().format(); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    if (ast.kind === Kind.STRING) {
      //parse date as string and see if its valid
      if (!Date.parse(ast.value))
        throw new ValidationError(
          "The Date provided is not valid: see Date.parse MDN docs for more info"
        );
      return moment(new Date(ast.value)).utc().format();
    }

    return null;
  },
});

module.exports = { Date: dateScalar };
