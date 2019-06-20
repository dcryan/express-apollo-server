import jwt from 'jsonwebtoken';

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user;
  return jwt.sign({ id, email, username }, secret, { expiresIn });
};
export default {
  Query: {
    users: async (parent, args, { models }) => models.User.findAll(),
    user: async (parent, { id }, { models }) => models.User.findByPk(id),
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }

      return models.User.findByPk(me.id);
    },
  },

  Mutation: {
    signUp: async (
      parent,
      { username, email, password },
      { models, secret }
    ) => {
      const user = await models.User.create({ username, email, password });
      return { token: createToken(user, secret, '30m') };
    },
  },

  User: {
    messages: async (user, args, { models }) =>
      models.Message.findAll({
        where: {
          userId: user.id,
        },
      }),
  },
};
