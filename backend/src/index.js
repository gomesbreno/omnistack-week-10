const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routers = require("./router");
const http = require("http");

const { setupWebsocket } = require("./websocket");

const app = express();
const server = http.Server(app);

setupWebsocket(server);

const user = "breno";
const password = "akumanomi";
const database = "week10";
mongoose.connect(
  `mongodb+srv://${user}:${password}@cluster0-xjemk.mongodb.net/${database}?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);
app.use(cors());
app.use(express.json());
app.use(routers);

server.listen(3333);
