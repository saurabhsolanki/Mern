const mongoose=require("mongoose")

const DB = process.env.DATABASE;


const connect = () => {
  return mongoose.connect(DB);
};

module.exports = connect;
