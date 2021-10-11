const { GraphQLScalarType, Kind } = require("graphql");
const { SyntaxError } = require("apollo-server");
const { URL } = require("url");

const coerceAsURLObj = (value) => {
  if (typeof value != "string")
    throw new SyntaxError(`URL coercion error: can only parse strings to URLs;
    got value ${value} of type ${typeof value}`);
  try {
    return new URL(value).href;
  } catch (error) {
    throw new SyntaxError(
      `URL coercion error: value ${value} is an invalid URL string representation.`
    );
  }
};

const parseURL = (ast) => {
  if (ast.kind !== Kind.STRING)
    throw new SyntaxError(
      `Query input coercion error: can only parse strings to
    URLs; got value ${ast.value} of kind ${ast.kind}`,
      [ast]
    );
  return coerceAsURLObj(ast.value);
};

const urlScalar = new GraphQLScalarType({
  name: "URL",
  description:
    "Scalar type that represents an URL, expressed as an URL string.",
  serialize: coerceAsURLObj,
  parseValue: parseURL,
  parseLiteral: parseURL,
});

module.exports = { URL: urlScalar };
