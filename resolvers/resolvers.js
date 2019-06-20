const uuidv4 = require('uuid/v4');

export default {
  Query: {
    users: (parent, args, { models }) => Object.values(models.users),
    user: (parent, { id }, { models }) => models.users[id],
    me: (parent, args, { me }) => me,

    messages: (parent, args, { models }) => Object.values(models.messages),
    message: (parent, { id }, { models }) => models.messages[id],
  },

  Mutation: {
    createMessage: (parent, { text }, { me, models }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };

      models.messages[id] = message;
      models.users[me.id].messageIds.push(id);

      return message;
    },

    updateMessage: (parent, { id, text }, { models }) => {
      models.messages[id].text = text;
      return models.messages[id];
    },

    deleteMessage: (parent, { id }, { me, models }) => {
      const message = models.messages[id];
      const messageIdIndex = me.messageIds.findIndex(
        messageId => messageId === id
      );

      if (!message || messageIdIndex === -1) return false;

      delete models.messages[id];
      me.messageIds.splice(messageIdIndex, 1);

      return true;
    },
  },

  User: {
    username: user => user.username,
    messages: (user, args, { models }) =>
      Object.values(models.messages).filter(
        message => message.userId === user.id
      ),
  },
  Message: {
    user: (message, args, { models }) => models.users[message.userId],
  },
};
