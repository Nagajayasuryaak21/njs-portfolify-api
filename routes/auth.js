const router = require("express").Router();
const { User } = require("../models/user");
const { Data } = require("../models/data");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.get("/",(req,res)=>{res.send("HELLO")});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });
    console.log(user);
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(validPassword);
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    // const token = user.generateAuthToken();
    // console.log(token);
    // const data = await Data.findOne
    // res.status(200).send({ data: token, message: "logged in successfully" });
    Data.findOne({ user: user._id })
      .then((data) => {
        if (!data) {
          return res.status(404).send("Data not found");
        }
		console.log(data);
        // data was found, do something with it
        res.status(200).send(data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Internal server error");
      });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" + error.message });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
