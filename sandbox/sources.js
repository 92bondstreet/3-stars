/* eslint-disable no-console, no-process-exit */
async function sandbox (source, current) {
  try {
    if (! source) {
      console.error('🔗 source not given');
      process.exit(1);
    }

    console.log(`🕵️‍♀️  browsing source from issue ${current}`);

    const core = require(`../core/sources/${source}`);
    const posts = await core.browse(current);

    console.log(`${posts.length} posts found`);
    console.log(posts);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, source, current = 0] = process.argv;

sandbox(source, + current);
