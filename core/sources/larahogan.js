const {mailchimp} = require('../utils');
const {SOURCE_LARA_HOGAN} = require('../constants');

/**
 * Browse all campaigns
 * @return {Array}
 */
module.exports.browse = async () => {
  console.log('fetching all campaigns...');
  return mailchimp({'domain': 'larahogan', 'source': SOURCE_LARA_HOGAN});
};
