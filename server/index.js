require("dotenv").config();
let compression = require('compression');
let helmet = require('helmet');
const express = require("express");
const bodyParser = require("body-parser");
let cors = require("cors");
const timeout = require("connect-timeout");
const app = express();

const fileUpload = require("express-fileupload");
app.use(fileUpload());
  const session = require('express-session');
const ParseUploadedFile = require("./ParseUploadedFile");
  app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
  }));

app.use(helmet());
 app.use(cors());
app.use(bodyParser.json());
app.use(timeout(1000*200));
const PORT = 3001;

app.get("/api/test", async(request, res) => {

  const today = new Date();
  const now = today.toTimeString().substring(0, 8);
  const result = {
    time: now,
  };

  return res.send(result);
});
app.post("/api/test", async(req, res) => {
  const result = await ParseUploadedFile(req)
  return res.send(JSON.stringify(result));
});
app.use(compression()); 
app.use(express.json());

app.listen(PORT, (req, res) => {
  console.log(`Started on port ${PORT}`);
});
      module.exports = app;
