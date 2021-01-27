const express = require("express");
const app = express();

app.use(express.json());

const todoRouter = require("./routes/todo");
app.use("/todo", todoRouter);

app.listen(5000, () => console.log("server started"));
