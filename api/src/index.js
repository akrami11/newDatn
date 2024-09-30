const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');

const route = require('./routes');
const db = require('./config/db');

// const { engine } = require('express-handlebars');
// const path = require('path');

const app = express();
const port = 3001;
console.log(express.static('index'));

// app.use(morgan('combined'));

const corsOptions = [
  {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
  },
  {
    origin: 'http://localhost:3000/admin',
    credentials: true,
    optionSuccessStatus: 200,
  },
];
app.use(cors(corsOptions));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//route init
route(app);

//connect to DB :
db.connect();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
