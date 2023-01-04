const { esclient, index, type } = require("../../elastic");

async function getTags(req) {

  const query = {
    query: {
      match: {
        tag: {
          query: req.text,
          operator: "and",
          fuzziness: "auto"
        }
      }
    }
  }

  const { body: { hits } } = await esclient.search({
    from:  req.page  || 0,
    size:  req.limit || 100,
    index: index, 
    type:  type,
    body:  query
  });

  const results = hits.total.value;
  const values  = hits.hits.map((hit) => {
    return {
      id:     hit._id,
      tag:    hit._source.tag,
      author: hit._source.author,
      score:  hit._score
    }
  });

  return {
    results,
    values
  }

}

async function getAutocomlete(req) {

  /*const query = {
    query: {
      match_phrase_prefix: {
        "tag": req.text
      }
    }
  }*/

  const query = {
    query: {
      match: {
        tag: {
          query: req.text,
          operator: "and",
          fuzziness: "auto"
        }
      }
    }
  }

  const { body: { hits } } = await esclient.search({
    from:  req.page  || 0,
    size:  req.limit || 100,
    index: index, 
    type:  type,
    body:  query
  });

  const results = hits.total.value;
  const values  = hits.hits.map((hit) => {
    return {
      id:     hit._id,
      tag:    hit._source.tag,
      author: hit._source.author,
      score:  hit._score
    }
  });

  return {
    results,
    values
  }

}

async function insertNewTag(tag, author) {
  return esclient.index({
    index,
    type,
    body: {
      tag,
    }
  })
}

module.exports = {
  getTags,
  getAutocomlete,
  insertNewTag
}