const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        books: async (parent, {username}) => {
            const params = username ? {username} : {};
            return Book.find(params).sort({ title: -1 });
        },
        user: async (parent, {_id}) => {
            const params = _id ? {_id} : {};
            return User.find(params);
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({_id: context.user._id});
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token,user };
        },
        deleteBook: async (parent, { bookId }) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {saveBook: {bookId: bookId}}},
                    {new: true}
                );

                return updateUser;
            }

            throw new AuthenticationError('You need to be logged in to do this!')
        },
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$push: {saveBook: bookData}},
                    {new: true}
                );
            
            return updateUser;
            
            }

            throw new AuthenticationError('You need to be logged it to do this!')
            
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            
            return {token, user};
        },
    },
};


module.exports = resolvers;
