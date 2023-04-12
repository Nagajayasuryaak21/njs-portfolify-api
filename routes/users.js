const router = require("express").Router();
const { User, validate } = require("../models/user");
const { Data } = require("../models/data");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    // const { error } = validate(req.body);
    // if (error)
    // 	return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });
    console.log(user);
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword })
      .save()
      .then((savedData) => {
        //res.status(201).send(savedData);
		console.log(savedData);
		user = savedData;
		const newData = new Data({
			user: user._id,
			userName: user.firstName,
			userDo: "",
			userAbout: "",
			technologies: [],
			services: [],
			isExperience: false,
			experiences: [],
			isTestimonial: false,
			testimonials: [],
			isProject: false,
			projects: [],
      aboutProject:""
		  });
		  newData
			.save()
			.then((savedData) => {
			  res.status(201).send("Registered Successfully & " + savedData);
			})
			.catch((error) => {
			  console.error(error);
			  res.status(500).send("Internal server error");
			});
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Internal server error");
      });
    
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
