const express = require("express");
const route = require("./route/route");
const { default: mongoose } = require("mongoose");
mongoose.set("strictQuery", true);
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
var path = require("path");
const env = require("dotenv");
env.config({ path: path.join(__dirname, "../.env") });

mongoose
  .connect(process.env.Mongodb_Connect, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  return res.send("welcome to service");
});
app.use("/", route);

app.listen(process.env.PORT, function () {
  console.log("express is running on port :", process.env.PORT);
});
