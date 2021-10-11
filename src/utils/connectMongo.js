const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URL;

const mongoClient = () => {
  if (!url) throw new Error("Can not create MONGO DB. No url Provided");
  const client = new MongoClient(url, {
    auth: {
      password: "example",
      username: "root",
    },
    appName: "sta-node",
  });

  return client.connect();
};

module.exports = { mongoClient };
