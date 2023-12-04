import express, { json } from "express";
const app = express();
app.use(json());

app.listen(5001, () => {
  console.log("🚀 Server started on http://localhost:5001");
});
