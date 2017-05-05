const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const db = require('./models');
const api = require('./api');

app.use(express.static('./public'));

app.use(bodyParser.json());
app.use('/api', api);

app.get('/*', (req, res) => {
  const rs = fs.createReadStream('./public/index.html');
  rs.on('open', () => {
    rs.pipe(res);
  });
  rs.on('error', (err) => {
    res.end(err);
  });
});

app.listen(PORT, () =>{
  // db.sequelize.sync({ force: true });
  console.log(`Listening on ${PORT}`);
});
