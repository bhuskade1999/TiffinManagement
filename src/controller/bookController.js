const bookModel = require("../model/bookmodel");
const moment = require("moment");

//============================== Create Book ================================================//

const addTeffin = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Please provide details" });

    let { currentDay, day, userId } = data;
    let activeUser = req.token;
    console.log(activeUser);
    req.body.userId = activeUser;
    const books = await bookModel.create(data);
    return res
      .status(201)
      .send({ status: true, message: "Added Successfully" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//=================================== Get Books with query filter =======================================//

const getBooks = async function (req, res) {
  try {
    let data = req.params;
    let { startDate, endDate } = data;
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Please provide details" });
    const userId = req.token;
    const tasks = await bookModel.find({
      currentDay: { $gte: startDate, $lte: endDate },
      userId: userId,
    });

    return res.status(200).send({ status: true, data: tasks });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

function convertToDateObject(dateString) {
  const [day, month, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}T00:00:00Z`); // Create Date object
}
// ===================================== Get Book By Params =============================================

module.exports = { addTeffin, getBooks };
