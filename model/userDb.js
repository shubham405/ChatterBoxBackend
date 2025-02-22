const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
// chatName,isGroupChat,users,latestMessage,groupAdmin
let schema = {
  name:{type:String, required:true},
  email:{type:String, required:true, unique:true},
  password:{type:String, required:true},
  pic:{type:String, 
    default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  },

};
const userDb = mongoose.Schema(schema,{timestamps:true});
userDb.pre('save',async function (next) {
  if(!this.isModified('password'))
  {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password  = await bcrypt.hash(this.password,salt);
  next();
  
});
userDb.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password,this.password);
}
const User = mongoose.model('User', userDb);
module.exports = User;
