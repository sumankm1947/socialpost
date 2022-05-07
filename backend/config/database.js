const mongoose = require("mongoose");

exports.connectDatabase = async () => {
  try {
    const con = await mongoose.connect( process.env.MONGODB_URI);

    console.log(`Connected to database : ${con.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
