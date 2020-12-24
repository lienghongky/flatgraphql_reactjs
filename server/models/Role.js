import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{ type: String},
    
  });

  import mongoose from "mongoose";

  const schema = mongoose.schema({
      name:{type:String},

  })
  export const User = mongoose.model("roles",schema);