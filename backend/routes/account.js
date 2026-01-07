  
const express = require("express");
const { authMiddleware } = require("../authentication/middleware");
const { User, Account } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get('/balance', authMiddleware, async(req,res) => {
  const account = await Account.findOne({
    userId: req.userId
  })

  res.json({
    balance: account.balance
  })
});


router.post("/transfer", authMiddleware, async(req,res)=>{

  /*
  const to = req.body.to;
  const amount = req.body.amount


  const sender = await User.findOne({
    _id: req.userId
  })

  const receiver = await User.findOne({
    _id: to
  })

  console.log("222222222222222222222222222222222", receiver)
  console.log("333333333333333333333333333333333", sender)

  const senderBal = await Account.findOne({
    userId: req.userId
  })

  const toAccount = await Account.findOne({
    userId:to
  })

  if (senderBal.balance < amount) {
    return res.status(400).json({
      message: "Insufficient Balance"
    })
  }

  if (!toAccount) {
      return res.status(400).json({
        message: "Invalid account"
      })
    }

  await Account.updateOne(
      {userId: req.userId},
      {$inc: {balance: -amount}}
    )

  await Account.updateOne(
    {userId: receiver._id},
    {$inc: {balance: amount}}
  )

  res.json({
    msg:"Transfer Successful"
  })

  */

  const session = await mongoose.startSession();

  session.startTransaction();
  const {amount, to} =  req.body;

  const account = await Account.findOne({userId: req.userId}).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient Balance"
    })
  }

  const toAccount = await Account.findOne({userId: to}).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid Account"
    })
  }

  await Account.updateOne(
    {userId: req.userId},
    {$inc: {balance: -amount}}
  ).session(session);

  await Account.updateOne(
    {userId: to},
    {$inc: {balance: amount}}
  ).session(session);

  await session.commitTransaction();

  res.json({
    message: "Transfer Successful"
  });
});

module.exports = router;