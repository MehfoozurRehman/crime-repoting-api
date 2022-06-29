const router = require("express").Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

router.get("/user/get_all", async (req, res) => {
  try {
    res.send(await userModel.find({}));
  } catch (error) {
    console.log(error);
  }
});

router.post("/user/register", async (req, res) => {
  const { name, email, password, role, phone, address, gender } = req.body;
  if (name === undefined) {
    res.status(300).send("enter name");
  } else if (email === undefined) {
    res.status(300).send("enter email");
  } else if (password === undefined) {
    res.status(300).send("enter password");
  } else {
    const user = await userModel.findOne({ email });
    if (user && user.email === email) {
      res.status(300).send("user already exists");
    } else {
      bcrypt.hash(password, 5, function (err, hash) {
        if (err) {
          console.log("err", err);
        }
        try {
          new userModel({
            name: name,
            email: email,
            password: hash,
            role: role,
            gender: gender,
            phone: phone,
            address: address,
          }).save();
          res.status(200).json({
            name: name,
            email: email,
            role: role,
            gender: gender,
            phone: phone,
            address: address,
          });
        } catch (error) {
          console.log("errror", err);
        }
      });
    }
  }
});

router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  if (email === undefined) {
    res.status(300).send("enter email");
  } else if (password === undefined) {
    res.status(300).send("enter password");
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    res.status(400).send("user not found");
  } else {
    bcrypt.compare(password, user.password).then(function (result) {
      if (result) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          gender: user.gender,
          phone: user.phone,
          address: user.address,
          role: user.role,
          createdAt: user.createdAt,
        });
      } else {
        res.status(301).send("invalid crediantials");
      }
    });
  }
});

module.exports = router;
