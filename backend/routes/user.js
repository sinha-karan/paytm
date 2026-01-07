const express = require("express");
const router = express.Router();
const z = require('zod');
const jwt = require('jsonwebtoken')
const secret = require('../config');
const { User, Account } = require("../db");
const { authMiddleware } = require("../authentication/middleware")

const signUpSchema = z.object({
   username : z.string().email({message: "Invalid mail address"}),
   firstName : z.string(),
   lastName : z.string(),
   password : z.string().min(8,{message: "Password should be atleast of 8 character"}).max(32,{message: "Password should be less than 32 character"})
})


router.post("/signup", async(req,res) => {
  const validationResult = signUpSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(411).json({
      message: "Validation failed",
      error: validationResult.error.issues
    });
  }

  const { username, password, firstName, lastName } = validationResult.data

  const userfind = await User.findOne({
    username: username
  })

  if (userfind) {
    return res.status(400).json({
      message: "User already exist!"
    })
  }

  const user = await User.create({
    username,
    password,
    firstName,
    lastName
  })

  const userId = user._id;

  //---------Create new Account

  const balance = 1 + Math.random()*10000;

  await Account.create({
    userId: userId,
    balance
  })

  //-------------------------

  const token = jwt.sign({ userId }, secret.JWT_SECRET);


  res.json({
    message: "User Created sucesfully",
    token: token,
    userId: userId
  })
})


//----------------------------------------------------------------------------//

const signInSchema = z.object({
  username: z.string().email({message:"Invalid mail address"}),
  password: z.string()
})

router.post("/signin", async(req,res) => {

  const validationSignIn = signInSchema.safeParse(req.body);

  if (!validationSignIn.success) {
    return res.status(411).send("Wrong Input");
  }
  
  const {username, password} = validationSignIn.data;


  const existingUser = await User.findOne({
    username,
    password
  });

  if (existingUser) {
    const token = jwt.sign({userId: existingUser._id}, secret.JWT_SECRET);

    res.status(200).json({
      message: "User Signed In",
      token: token
    });

    return;
  }

  return res.status(411).json({
      message: "Error while logging"
    });
})

const updateSchema = z.object({
  password: z.string().min(8).max(32).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional()
})


router.put("/", authMiddleware , async(req, res) => {
  const validateInput = updateSchema.safeParse(req.body)

  if (!validateInput.success) {
    return res.status(411).json({
      message: "Error while updating information"
    })
  }

  const userId = req.userId

  await User.updateOne(
    {_id: userId},
    req.body
  )

  res.json({
    message: "Updated successfully" 
  })
})

/* 
$regex is a search tool used mainly in databases (like MongoDB) to find text by pattern, not exact match.

Think of it as:
"Find text that looks like this"

Instead of:
“Find text that is exactly this”
*/

router.get("/bulk", async(req,res) => {

  const filter = req.query.filter || ""

  const users = await User.find({
    $or: [{
        firstName : {
          $regex : filter , $options : "i"
       }
      } , {
        lastName: {
          $regex : filter, $options : "i"
        }
      }]
  })

  res.status(200).json({
    users: users.map(user => ({
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id
    }))
  })
})

module.exports = router