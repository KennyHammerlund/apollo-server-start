const { ApolloError } = require("apollo-server");
const codes = require("./codes");
class DocusignError extends ApolloError {
  constructor(message, extraData) {
    super(message, codes.DOCUSIGN_API_ERROR, extraData);
  }
}
module.exports = DocusignError;
