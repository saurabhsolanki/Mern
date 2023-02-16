const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const express = require("express");
const { default: mongoose } = require('mongoose')
mongoose.set("strictQuery", true);
const todoRoute=require("./router/todo.route")
const cors=require("cors")
require("dotenv").config();

const app = express();
app.use(cookieParser())

dotenv.config({ path: "./config.env" });
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors())
app.use("/todos",todoRoute)


app.use(require("./router/auth"))

const PORT = process.env.PORT || 5000;
const URL = process.env.DATABASE || "";


app.listen(PORT, async() => {
  await mongoose.connect("mongodb+srv://mernthapa:mernthapa@cluster0.xatq1qr.mongodb.net/mernstack")
  console.log(`server started on port ${PORT}`)
})

// mongodb+srv://mernthapa:<password>@cluster0.xatq1qr.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://mernthapa:mernthapa@cluster0.xatq1qr.mongodb.net/test
