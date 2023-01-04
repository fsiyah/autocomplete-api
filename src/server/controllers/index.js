const model = require("../models");

/**
 * @function getTags
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {void}
 */

async function getTags(req, res) {
  const query  = req.query;

  if (!query.text) {
    res.status(422).json({
      error: true,
      data: "Missing required parameter: text"
    });

    return;
  }

  try {

    const result = await model.getTags(req.query);
    res.json({ success: true, data: result });

  } catch (err) {
    res.status(500).json({ success: false, error: "Unknown error."});
  }
}

/**
 * @function getAutocomplete
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {void}
 */

async function getAutocomplete(req, res) {
  const query  = req.query;

  if (!query.text) {
    res.status(422).json({
      error: true,
      data: "Missing required parameter: text"
    });

    return;
  }

  try {

    const result = await model.getAutocomplete(req.query);
    res.json({ success: true, data: result });

  } catch (err) {
    res.status(500).json({ success: false, error: "Unknown error."});
  }
}

/**
 * @function addTag
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {void}
 */

async function addTag(req, res) {

  const body = req.body;

  if (!body.tag) {
    res.status(422).json({
      error: true,
      data: "Missing required parameter(s): 'tag'"
    });

    return;
  }

  try {

    const result = await model.insertNewTag(body.tag);
    res.json({ 
      success: true, 
      data: {
        id:   result.body._id,
        tag:  body.tag
      } 
    });

  } catch (err) {
    res.status(500).json({ success: false, error: "Unknown error."});
  }

}

module.exports = {
  getTags,
  getAutocomplete,
  addTag
};