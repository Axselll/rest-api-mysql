const pool = require("../../db");

const getTodo = async (req, res, next) => {
	let todo;
	try {
		const { todo_id } = req.params;
		todo = await pool.query("SELECT * FROM todo_tbl WHERE todo_id = ?", [
			todo_id,
		]);
		if (todo == null)
			return res.status(404).json({ message: "task not exist " });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
	res.todo = todo;
	next();
};

module.exports = getTodo;
