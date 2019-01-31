const chrono = require('chrono-node');

/**
 * Get date of the issue
 * @param  {Object} element
 * @return {String}
 */
module.exports.getDate = date => {
  return new Date(chrono.parseDate(date));
};

/**
 * Get issue number from url
 * @param  {String} item
 * @return {Number}
 */
module.exports.getIssue = item => {
  const re = new RegExp(/\d+/);
  const matches = item.match(re);

  if (matches) {
    return + matches[0];
  }

  return 0;
};
