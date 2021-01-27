const express = require("express");
const router = express.Router();
const pool = require("../db");
const getTodo = require("./middleware/todo");

// get all
router.get("/", async (req, res) => {
	try {
		const todo = await pool.query("SELECT * FROM todo_tbl");
		res.json(todo[0]);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// get one
router.get("/:todo_id", getTodo, async (req, res) => {
	res.json(res.todo[0]);
});

// create
router.post("/", async (req, res) => {
	try {
		const { task } = req.body;
		const newTodo = await pool.query("INSERT INTO todo_tbl (task) VALUES (?)", [
			task,
		]);
		res.status(201).json(newTodo);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// update
router.put("/:todo_id", getTodo, async (req, res) => {
	try {
		const { todo_id } = req.params;
		const { task } = req.body;
		const updatedTodo = await pool.query(
			"UPDATE todo_tbl SET task = ? WHERE todo_id = ?",
			[task, todo_id]
		);
		res.json(updatedTodo);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// delete
router.delete("/:todo_id", getTodo, async (req, res) => {
	try {
		const { todo_id } = req.params;
		const deleteTodo = await pool.query(
			"DELETE FROM todo_tbl WHERE todo_id =?",
			[todo_id]
		);
		res.json({ message: "task deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
