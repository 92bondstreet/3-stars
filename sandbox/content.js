const {issues} = require('../core/index');

(async () => {
  try {
    console.log(await issues());
  } catch (error) {
    console.error(error);
  }
})();
