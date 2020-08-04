const { Router } = require("express");

const DevController = require("./controllers/DevControllers");
const SearchController = require("./controllers/SearchController");

const routers = Router();

routers.get("/devs", DevController.index);
routers.post("/devs", DevController.store);
routers.get("/search", SearchController.index);

module.exports = routers;
