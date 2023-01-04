const elastic = require("../elastic");
const tags  = require(`./tags.json`);

/**
 * @function createESAction
 * @returns {{index: { _index: string, _type: string }}}
 * @description Returns an ElasticSearch Action in order to
 *              correctly index documents.
 */

const esAction = {
  index: {
    _index: elastic.index,
    _type: elastic.type
  }
};

/**
 * @function pupulateDatabase
 * @returns {void}
 */

async function populateDatabase() {

  const docs = [];

  for (const tag of tags) {
    docs.push(esAction);
    docs.push(tag);
  }

  return elastic.esclient.bulk({ body: docs });
}

module.exports = {
  populateDatabase
};