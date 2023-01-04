const express    = require("express");
const controller = require("../controllers");
const routes     = express.Router();

routes.route("/").get(controller.getTags);
routes.route("/autocomplete").get(controller.getAutocomplete);
routes.route("/new").post(controller.addTag);

module.exports = routes;