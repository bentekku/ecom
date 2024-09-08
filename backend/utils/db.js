const mongoose = require("mongoose");
const dotENV = require("./dotEnv");
dotENV();

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const connectToDB = async () => {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    const conn = await mongoose.connect(process.env.MONGO_URL, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectToDB;
