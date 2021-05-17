const { AuthenticationError } = require('apollo-server-express');
// import user model
const { User, Book } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedBooks');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('savedBooks');
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, args, context) => {

      console.log("⬇⬇⬇ context.user._id ⬇⬇⬇");
      console.log(context.user._id);

      console.log("⬇⬇⬇ args ⬇⬇⬇");
      console.log(args);

      if (context.user) {

        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: {savedBooks: args} },
          { new: true }
        );

        const token = signToken(user);
        return { token, user };
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedBooks: args } },
          { new: true }
        );

        const token = signToken(user);
        return { token, user };
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;