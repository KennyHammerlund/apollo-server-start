const { ValidationError } = require("apollo-server");

/**
 * validates a set of variables that should be required in a given object.
 * Throws an error if a variable passed in the array is not a value in the object.
 *
 * @example varValidator(['name','date'], {name: 'kenny', date: undefined}) //throws Error
 * @example varValidator(['name','date'], {name: 'kenny', date: '`12-21-1'}) // No Error
 */
const varValidator = (vars, object, message) => {
  if (!Array.isArray(vars))
    throw new ValidationError("The vars parameter is not an array");
  vars.map((variable) => {
    const val = object[variable];
    if (val === undefined || val === null)
      throw new ValidationError(`${variable} is required:${message}`);
  });
};

module.exports = { varValidator };
