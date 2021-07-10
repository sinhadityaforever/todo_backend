const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()); //used for req.body

app.listen(5000, "192.168.56.1", () => {
  console.log("server is listening on port 5000");
});

//get all, get, create, update, delete

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.status(200).json(newTodo.rows[0]["todo_id"]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/todos", async (req, res) => {
  try {
    const info = await pool.query("SELECt * FROM todo");
    res.status(200).json(info.rows);
  } catch (error) {
    res.status(400).json({
      Error: error,
    });
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todoReq = await pool.query("SELECT * FROM todo WHERE todo_id=$1;", [
      id,
    ]);
    res.status(200).json(todoReq.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
