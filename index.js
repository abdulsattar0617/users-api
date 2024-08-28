const usersRoute = require("./Routes/usersRoute"); 
const express = require("express");
const port = 3000;
const app = express();

// middlewares to parse JSON & Form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Root");
});

// Mount User route
app.use("/Users", usersRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
