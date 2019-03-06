const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const methodOverride = require('method-override');
const logger = require('morgan');
const cors = require('cors');

// const errorHandlers = require('./middleware/errorHandlers');


const port = process.env.PORT || 5000;
// const db = require('./database');
const app = express();

console.log(process.env.NODE_ENV)
console.log(app.get('env'))

app.use(cors());
app.use(logger('dev'));
app.use(methodOverride());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any());

app.get('/', (req, res) => res.send('gql server'));

// app.use('/api/articles', article);
// app.use(errorHandlers.logErrors);
// app.use(errorHandlers.clientErrorHandler);
// app.use(errorHandlers.errorHandler);

app.listen(port, () => console.log(`http://localhost:${port}`));