const { Client } = require("@elastic/elasticsearch");
                   require("dotenv").config();

const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";
const esclient   = new Client({ node: elasticUrl });
const index      = "tags";
const type       = "tags";

/**
 * @function createIndex
 * @returns {void}
 * @description Creates an index in ElasticSearch.
 */

async function createIndex(index) {
  try {

    await esclient.indices.create({ index });
    console.log(`Created index ${index}`);

  } catch (err) {

    console.error(`An error occurred while creating the index ${index}:`);
    console.error(err);

  }
}

/**
 * @function setTagsMapping,
 * @returns {void}
 * @description Sets the tags mapping to the database.
 */

async function setTagsMapping () {
  try {
    const schema = {
      tag: {
        type: "text"
      }
    };
  
    await esclient.indices.putMapping({ 
      index, 
      type,
      include_type_name: true,
      body: { 
        properties: schema 
      } 
    })
    
    console.log("Tags mapping created successfully");
  
  } catch (err) {
    console.error("An error occurred while setting the tags mapping:");
    console.error(err);
  }
}

/**
 * @function checkConnection
 * @returns {Promise<Boolean>}
 * @description Checks if the client is connected to ElasticSearch
 */

function checkConnection() {
  return new Promise(async (resolve) => {

    console.log("Checking connection to ElasticSearch...");
    let isConnected = false;

    while (!isConnected) {
      try {

        await esclient.cluster.health({});
        console.log("Successfully connected to ElasticSearch");
        isConnected = true;

      // eslint-disable-next-line no-empty
      } catch (_) {

      }
    }

    resolve(true);

  });
}

module.exports = {
  esclient,
  setTagsMapping,
  checkConnection,
  createIndex,
  index,
  type
};