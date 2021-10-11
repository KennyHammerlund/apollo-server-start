const _ = require("lodash");
/**
 * Used to flatten sequelize model instances into a palletable object.
 */
module.exports.flatten = (model) => {
  if (!model) return model;

  const value = Array.isArray(model)
    ? model.map((m) => m.get({ plain: true }))
    : model.get({ plain: true });

  const obj = {};
  const _flatten = (v, k) => {
    // pass value to
    const prep = (v) => {
      _.each(v, (item, key) => {
        if (!(_.isPlainObject(item) || _.isArray(item)) && !value[key]) {
          if (!_.isArray(obj[key])) obj[key] = [];
        } else {
          prep(item);
        }
      });
    };
    if (_.isPlainObject(v) || _.isArray(v)) {
      if (_.isArray(v)) {
        prep(v);
      }
      _.each(v, _flatten);
    } else {
      if (!obj[k]) obj[k] = v;
      else {
        //if (!_.isArray(obj[k]) && this.group) obj[k] = [obj[k]];
        if (_.isArray(obj[k])) {
          obj[k].push(v);
          obj[k] = _.uniq(obj[k]);
        }
      }
    }
  };

  _.each(value, _flatten);
  return obj;
};
