const {mailchimp} = require('../utils');
const {SOURCE_LARA_HOGAN} = require('../constants');

/**
 * Browse all campaigns
 * @return {Array}
 */
module.exports.browse = async (current = 0) => {
  console.log('fetching all campaigns...');
  const campaigns = await mailchimp({'domain': 'larahogan', 'source': SOURCE_LARA_HOGAN});

  return campaigns.filter(item => item.issue > current);
};
