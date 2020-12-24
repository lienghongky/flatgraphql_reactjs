import { User } from "../models/UserTC";
import JWTUtil from "../utils/JWTUtil"


export const resolvers = {
  Query: {
    test: async () => {
      try {
        const user = await User.findOne({name:"Student1"}).then(e=>{
          return JWTUtil.signToken(e)
        }).catch(error=>{
          return "NOT FOUND"
        })
      } catch (error) {
        return "error"
      }
    },
    users: () => User.find()
  },
  Mutation: {
    addTest: async (_,{})=>{
      return "ok this is testing function"
    },
    addUser: async (_, { name }) => {
      const user = new User({ name });
      await user.save();
      return user;
    },
    login: async (req,{username,password}) => {
      const user = await User.findOne({name:username})
      if(!user){
        return Error("USER NAME PASSWORD IS INCORRECT")
      }
      const token = jwt.sign(
        {"user":user},
        "f1BtnWgD3VKY",
        { algorithm: "HS256", subject: "1", expiresIn: "1d" }
      );
      return "sadfasdf";
    }
  }
};