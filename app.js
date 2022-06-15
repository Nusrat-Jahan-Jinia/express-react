const express = require("express");
const path = require("path");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");
PORT = 5000;

const app = express();

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// routing setup
app.get("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

app.listen(PORT, () => {
  console.log(`app listening to port ${PORT}`);
});
