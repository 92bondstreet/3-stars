const {mailchimp} = require('../utils');
const {SOURCE_THE_ENG_MAN} = require('../constants');

/**
 * Browse all campaigns
 * @return {Array}
 */
module.exports.browse = async () => {
  console.log('fetching all campaigns...');
  return mailchimp({'domain': 'theengineeringmanager', 'source': SOURCE_THE_ENG_MAN});
};
