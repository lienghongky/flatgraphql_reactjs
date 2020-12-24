import { User } from "../models/User";

export const resolvers = {
  Query: {
    test: () => "testing query",
    users: () => User.find()
  },
  Mutation: {
    addUser: async (_, { name }) => {
      const user = new User({ name });
      await user.save();
      return user;
    }
  }
};