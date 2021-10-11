const sqlFormatter = require("sql-formatter");

const loggingLevel = () => {
  if (!process.env || !process.env.npm_config_argv) return;
  const { original } = JSON.parse(process.env.npm_config_argv);
  if (!original.find((item) => item.match(`--log`))) return;

  if (original.includes(`--log=0`)) return 0;
  if (original.includes(`--log=3`)) return 3;
  return 1;
};

const logging = (query, options) => {
  const level = loggingLevel();
  if (level === undefined) return;

  const { name } = options || {};
  const tables = query.match(/tbl\w+/g);
  const esTable = query.match(/\[es\]\.\[(\w*)\]/);
  const tID = query.match(/\((\w*)\): [ROLLBACK|BEGIN]/);
  const tShortId = tID ? tID[1].slice(tID[1].length - 6, tID[1].length) : "";
  const tColor = "color: #fea12f";
  // Adds a gap between queries
  if (level > 3) console.log("\n");
  //Prints name of query always prints.
  if (query.match("ROLLBACK")) {
    console.groupCollapsed(`%cROLLBACK TRANSACTION ${tShortId}`, tColor); // eslint-disable-line no-console
  } else if (query.match("INSERT")) {
    console.groupCollapsed(
      `%cINSERT INTO::${tables ? tables[0] : esTable ? esTable[1] : "Table"}`,
      "color: #2770a7"
    ); // eslint-disable-line no-console
  } else if (query.match("BEGIN TRANSACTION")) {
    console.groupCollapsed(`%cBEGIN TRANSACTION ${tShortId}`, tColor); // eslint-disable-line no-console
  } else if (query.match("COMMIT TRANSACTION")) {
    console.groupCollapsed(`%cCOMMIT TRANSACTION ${tShortId}`, tColor); // eslint-disable-line no-console
  } else {
    console.groupCollapsed(
      `QUERY::${
        name ? name : tables ? tables[0] : esTable ? esTable[1] : "Query"
      }`
    ); // eslint-disable-line no-console
  }

  //prints bind vars
  if (options && options.bind) console.groupCollapsed("BIND::", options.bind);

  // Prints SQL formatted
  if (level > 0)
    console.log(
      sqlFormatter.format(query, { uppercase: true, linesBetweenQueries: 2 })
    ); // eslint-disable-line no-console

  console.groupEnd(); // eslint-disable-line no-console
};

module.exports = { logging };
