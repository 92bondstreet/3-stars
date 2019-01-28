const core = require('../core');

const POST = {
  'domain': 'softwareleadweekly',
  'objectID': 'cd8e862d-0d9c-5401-87ef-91237fa7299a',
  'issue': 15,
  'source': 'http://softwareleadweekly.com/issues/15',
  'year': 2013,
  'title': '10 Mistakes Companies Make That Destroy Employee Productivity',
  'tldr': `Short and precise list of mistakes you should avoid at all cost. What really struck a chord in me is "Rewarding Busyness Instead of Productivity". It's an easy trap to fall into.`, //eslint-disable-line
  'type': 'newsletter',
  'url': 'http://timemanagementninja.com/2013/02/10-mistakes-companies-make-that-destroy-employee-productivity/'
};

/* eslint-disable no-console, no-process-exit */
async function sandbox () {
  try {
    const records = await core.save([POST]);

    console.log(`${records.objectIDs.length} indexed`);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, source] = process.argv;

sandbox(source);
