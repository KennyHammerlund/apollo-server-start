/**
 * Base class for a repo/dataGetter
 * Pipes things through load/loadMany in prep for a dataLoader.
 */
class Repo {
  constructor({ dbConnector }) {
    if (!dbConnector)
      throw new Error("A Database connector is required for the Repo class");
    this.dbConnector = dbConnector;
  }

  async query(options) {
    const results = await this.model.findAll(options);
    if (!results || !results.length) return [];
    return results.map((r) => r.get({ plain: true }));
  }
}

module.exports = { Repo };
