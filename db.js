const mysql = require("mysql2/promise");

const pool = mysql.createPool({
	user: "axsel",
	password: "lolilol2500",
	port: "3306",
	database: "tododb",
	host: "localhost",
});

module.exports = pool;
