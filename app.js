import express, { json } from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';

const app = express();
const port = 4000;

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async () => ({
    models,
    me: await models.User.findByLogin('rwieruch'),
    secret: process.env.SECRET,
  }),
});
server.applyMiddleware({ app });

// create application/json parser
app.use(json()); // to support JSON-encoded bodies
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.use(require('./todos'));
app.use(require('./kittens'));

const eraseDatabaseOnSync = true;

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      email: 'hello@robin.com',
      password: 'rwieruch',
      messages: [
        {
          text: 'Published the Road to learn React',
        },
      ],
    },
    {
      include: [models.Message],
    }
  );

  await models.User.create(
    {
      username: 'ddavids',
      email: 'hello@david.com',
      password: 'ddavids',
      messages: [
        {
          text: 'Happy to release ...',
        },
        {
          text: 'Published a complete ...',
        },
      ],
    },
    {
      include: [models.Message],
    }
  );
};

// TODO: Test if this async really needs to be there.
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen(port, () =>
    console.log(
      `Server ready at http://localhost:${port}${server.graphqlPath}!`
    )
  );
});

console.log('listening on port 4000...');
