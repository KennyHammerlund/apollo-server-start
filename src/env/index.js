const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, `../../.env`) });

const local = require("./local");
const develop = require("./develop");
const staging = require("./staging");
const production = require("./production");
const test = require("./test");
const common = require("./common");

const envs = {
  test: { ...common, ...test },
  local: { ...common, ...local },
  develop: { ...common, ...develop },
  staging: { ...common, ...staging },
  production: { ...common, ...production },
};

const testEnv = process.env.NODE_ENV === "test" ? "test" : undefined;
module.exports = (env) =>
  envs[testEnv || env || process.env.APP_ENV || "production"];
