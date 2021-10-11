const { defineModels } = require("./define");
const { genRelationships } = require("./relationships");

const createData = async (sequelize) => {
  if (!sequelize) throw new Error("No Sequelize instance provided");
  defineModels(sequelize);

  if (process.env.SYNC_DB || process.env.NODE_ENV === "test") {
    await sequelize.sync({ force: true });
    // eslint-disable-next-line
    console.log("All models were synchronized successfully.");
  }
  genRelationships(sequelize);
};

module.exports = createData;
