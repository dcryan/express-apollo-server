export default {
  Query: {
    messages: async (parent, args, { models }) => models.Message.findAll(),
    message: async (parent, { id }, { models }) => models.Message.findByPk(id),
  },

  Mutation: {
    createMessage: async (parent, { text }, { me, models }) =>
      models.Message.create({
        text,
        userId: me.id,
      }),

    updateMessage: async (parent, { id, text }, { models, me }) =>
      models.Message.update(
        {
          text,
          userId: me.id,
        },
        {
          where: {
            id,
          },
        }
      ),

    deleteMessage: async (parent, { id }, { models }) => {
      models.Message.destroy({ where: { id } });
    },
  },

  Message: {
    user: async (message, args, { models }) =>
      models.User.findByPk(message.userId),
  },
};
