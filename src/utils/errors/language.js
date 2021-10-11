const { ValidationError } = require("apollo-server");
const codes = require("./codes");

class LanguageNotSupportedError extends ValidationError {
  constructor(language) {
    super(`Language: ${language} is not supported`, codes.LANGUAGE_ERROR);
  }
}
module.exports = LanguageNotSupportedError;
