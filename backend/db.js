const mongoose = require("mongoose");


// try {
//   mongoose.connect("mongodb+srv://0308karansinha:lu57k615pCSMxCom@admin.dmc7tlx.mongodb.net/paytm_week8")
//       .then(() => {console.log("connected to DB!")})
// } catch (error) {
//   console.log(error)
// }


const UserSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 30
  },
  password: {
      type: String,
      required: true,
      minLength: 8
  },
  firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
  },
  lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
  }
});

const accountSchema = new mongoose.Schema({
  userId : {
    type: mongoose.Schema.Types.ObjectId, //reference to User model
    ref:"User",
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
})

const Account = mongoose.model("Account", accountSchema)
const User = mongoose.model("User" ,UserSchema)


module.exports = {
  User,
  Account
};  