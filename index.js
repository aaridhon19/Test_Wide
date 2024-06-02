const express = require("express");
const app = express();
const port = 4000;
const router = require("./routers");
const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ini masuk")
  console.log("INI MASUK KE HALAMAN");
});

app.use(router);

app.listen(port, () => {
  console.log(`Masuk di ${port} nih`);
});

module.exports = app;
