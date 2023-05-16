const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const ads = [
  {title: 'Hello, world (again)!'}
];

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(ads);
});

app.listen(3001, () => {
  console.log('listening on port 3001');
});