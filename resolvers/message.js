import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isMessageOwner } from './authorization';

export default {
  Query: {
    messages: async (parent, args, { models }) => models.Message.findAll(),
    message: async (parent, { id }, { models }) => models.Message.findByPk(id),
  },

  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { me, models }) =>
        models.Message.create({
          text,
          userId: me.id,
        })
    ),

    updateMessage: combineResolvers(
      isMessageOwner,
      async (parent, { id, text }, { models, me }) =>
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
        )
    ),

    deleteMessage: combineResolvers(
      isMessageOwner,
      async (parent, { id }, { models }) => {
        models.Message.destroy({ where: { id } });
      }
    ),
  },

  Message: {
    user: async (message, args, { models }) =>
      models.User.findByPk(message.userId),
  },
};
