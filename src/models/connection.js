/* eslint-disable no-console */
const createData = require("./createData");
const { Sequelize } = require("sequelize");
const { logging } = require("./logging");

let sequelize;

const getSequelize = async () => {
  // if an instance is created (after initializing) lets just return that instance
  if (sequelize) return sequelize;
  // Delete the following line when connection params are introduced
  return {};
  /**
   * Define database connection information here
   * see Sequelize.io for more information regarding connections
   */
  // const {
  //   dbInfo: { database, username, password, host, port },
  // } = env();

  // sequelize = new Sequelize(database, username, password, {
  //   dialect: "mssql",
  //   host,
  //   port,
  //   dialectOptions: { options: { encrypt: true } },`
  //   logging,
  //   define: { freezeTableName: true },
  // });

  // Test for Authentication: Throws error if fails
  // await sequelize.authenticate();

  // console.log(
  //   `Connection to ${sequelize.config.database} DB created Successfully`
  // );

  // // creates the data and builds the sequelize models
  // await createData(sequelize);

  // return sequelize;
};

module.exports = { sequelize, getSequelize };
