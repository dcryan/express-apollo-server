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

  User: {
    messages: async (user, args, { models }) =>
      models.Message.findAll({
        where: {
          userId: user.id,
        },
      }),
  },
};
