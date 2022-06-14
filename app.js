const express = require("express");
const loginRouter = require("./router/loginRouter");
PORT = 5000;

const app= express();


// app.get("/",(req, res)=>{
//     res.send("hello world!")
// })

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("login")
})

app.listen(PORT, () => {
  console.log(`app listening to port ${PORT}`);
});