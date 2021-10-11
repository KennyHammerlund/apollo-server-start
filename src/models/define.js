const { DataTypes } = require("sequelize");
/**
 * Define the models to create the database
 * import the create functions and add them to the array.
 */

const defineModels = (sequelize) => {
  const models = [exampleModel].map((model) => model(sequelize));
  return models;
};

module.exports = { defineModels };

const exampleModel = (sequelize) => {
  return sequelize.define("Example_table", {
    exampleId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      field: "ExampleID",
    },
  });
};
