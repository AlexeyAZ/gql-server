const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const multer = require('multer');
const methodOverride = require('method-override');
const logger = require('morgan');
const cors = require('cors');

// eslint-disable-next-line no-unused-vars
const mongoose = require('./db');
const modules = require('./modules')

const port = process.env.PORT || 5000;
const server = new ApolloServer({
  modules,
  introspection: true,
  playground: true,
  context: ({ req }) => {
    const token = req.headers.authorization || null;
    return { token };
  },
  formatError: error => {
    console.log(error);
    delete error.extensions.exception;
    return error;
  },
});

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(methodOverride());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any());

server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}${server.graphqlPath}`);
});


// const express = require('express');
// const graphqlHTTP = require('express-graphql');






// console.log(process.env.NODE_ENV)
// console.log(app.get('env'))




// app.get('/', (req, res) => res.send('gql server'));
// app.use('/graphql', graphqlHTTP({
//   schema,
//   graphiql: true,
// }));

// // app.use('/api/articles', article);

// app.listen(port, () => console.log(`http://localhost:${port}`));