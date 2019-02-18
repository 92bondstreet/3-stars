const {mailchimp} = require('../utils');
const {SOURCE_THE_ENG_MAN} = require('../constants');

/**
 * Browse all campaigns
 * @return {Array}
 */
module.exports.browse = async (current = 0) => {
  console.log('fetching all campaigns...');
  const campaigns = await mailchimp({'domain': 'theengineeringmanager', 'source': SOURCE_THE_ENG_MAN});

  return campaigns.filter(item => item.issue > current);
};
