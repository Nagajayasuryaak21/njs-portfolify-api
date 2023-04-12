const router = require("express").Router();
const { User, validate } = require("../models/user");
const { Data } = require("../models/data");
//const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  //res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  try {
    //console.log(req);
    const dataId = req.body.userId;
    //console.log(dataId);
    await Data.findOne({user:dataId})
      .then((data) => {
        if (!data) {
          return res.status(404).send("Data not found");
        }

        // data was found, do something with it
        res.send(data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Internal server error");
      });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
router.post("/put", async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  try {
    console.log(req);
    const dataId = req.body.userId;
    const data = req.body.data;
    console.log(dataId);
    console.log(data);
    Data.findByIdAndUpdate(dataId,data,{new:true})
      .then((data) => {
        if (!data) {
          return res.status(404).send("Data not found");
        }

        // data was found, do something with it
        res.send(data);
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
