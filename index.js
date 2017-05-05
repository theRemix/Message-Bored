const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const db = require('./models');
const api = require('./api');

express.static('./public');

app.use(bodyParser.json());
app.use('/api', api);

app.listen(PORT, () =>{
  // db.sequelize.sync({ force: true });
  console.log(`Listening on ${PORT}`);
});
