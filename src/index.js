const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(router)

app.get("/", (req, res) => {
  return res.json({ message: "AVEX API" });
})

app.listen(process.env.PORT || 3001, () => {
  console.log('listening on port 3001');
});