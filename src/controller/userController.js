const userModel = require("../model/usermodel");
const jwt = require("jsonwebtoken");
const validator = require("../validator/validator");
const valid = require("validator");

// =================================== Create New User ==========================================

const creatUser = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Please provide details" });

    let { name, email, password } = data;

    let findEmail = await userModel.findOne({ email: email });
    if (findEmail)
      return res
        .status(400)
        .send({ status: false, message: "email already present" });

    let makeUser = await userModel.create(data);

    return res.status(201).send({ status: true, data: makeUser });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//===================================Login User With Credential and create Token ===================================

const loginUser = async function (req, res) {
  try {
    if (Object.keys(req.body).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Please provide details" });

    let email = req.body.email;
    let password = req.body.password;

    if (!email || !validator.isValid(email))
      return res
        .status(400)
        .send({ status: false, message: "email must be present" });
    email = email.trim();

    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "password must be present" });

    let findUser = await userModel.findOne({
      email: email,
      password: password,
    });

    if (!findUser)
      return res
        .status(400)
        .send({ status: false, message: "email or password may be incorrect" });

    let token = jwt.sign(
      { userId: findUser._id.toString() },
      "group10project",
      { expiresIn: "24h" }
    );

    res.setHeader("x-api-key", token);

    return res.status(200).send({ status: true, data: token });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const myProfile = async (req, res) => {
  const userId = req.token;
  console.log(userId);
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ status: true, myProfile: user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send({ message: "Server error" });
  }
};

module.exports = { creatUser, loginUser, myProfile };
