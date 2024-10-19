const express = require("express");
const middlwWare = require("../middleware/middleware");
const router = express.Router();
const userController = require("../controller/userController");
const bookController = require("../controller/bookController");

router.post("/register", userController.creatUser); // To create New User

router.post("/login", userController.loginUser); // User Login
router.get("/me", middlwWare.auth, userController.myProfile); // User Login

router.post("/books", middlwWare.auth, bookController.addTeffin); //Create New Books

router.get(
  "/books/start/:startDate/end/:endDate",
  middlwWare.auth,
  bookController.getBooks
); //get all books with filterations

router.all("/*", function (req, res) {
  res.status(400).send({ status: false, message: "Invalid URL" }); //In Case Wrong url
});

module.exports = router;
