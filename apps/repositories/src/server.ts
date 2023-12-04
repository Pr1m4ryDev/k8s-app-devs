import express, { json } from "express";
const app = express();
app.use(json());

app.listen(5003, () => {
  console.log("🚀 Server started on http://localhost:5003");
});
