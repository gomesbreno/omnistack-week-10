const axios = require("axios");

const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;
    //verifica se não existe esse dev cadastrado
    /** 
    let dev = await Dev.findOne({ github_username });
    console.log('dev em baixo');
    console.log(dev);
    console.log('dev em cima');
  */
    const response = await axios.get(
      `https://api.github.com/users/${github_username}`
    );
    const { name = login, avatar_url, bio } = response.data;

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    const dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location
    });

    const sendSocketMessageTo = findConnections(
      { latitude, longitude },
      techsArray
    );

    console.log(sendSocketMessageTo);
    sendMessage(sendSocketMessageTo, "new-dev", dev);

    return res.json(dev);
  }
};