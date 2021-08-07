const express = require('express');
// const expressJoi = require('express-joi');


const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticate');

const home = require('./routes/home');
const albums = require('./routes/albums');
const app = express();

app.use(express.json());

app.use(logger);

app.use(authenticate);

app.use('/api/albums', albums);

app.use('/', home);

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))