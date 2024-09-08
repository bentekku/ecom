const express = require("express");
const dotENV = require("./utils/dotEnv");
const connectToDB = require("./utils/db");
dotENV();

const app = express();
connectToDB();

// Middleware and routes here...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
