require("dotenv").config();

// ------- Imports --------
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const model = require("./model.js");

const initializePassport = require("../passport-config.js");
const createSession = require("../middleware/createSession.js");
const checkAuthenticated = require("../middleware/checkAuthenticated.js");
const globalErrorHandler = require("./controllers/errors.controller");

const staffRoutes = require("./routes/staff.routes");
const studentRoutes = require("./routes/student.routes");
const authRoutes = require("./routes/auth.routes");
const courseRoutes = require("./routes/course.routes");
const courseEnrollmentRoutes = require("./routes/course_enrollment.routes");
const attendanceRoutes = require("./routes/attendance.routes");

// ------- Set up server -------
const server = express();

// ------- Middleware --------
server.use(
	cors({
		origin: ["http://localhost:3000", "https://speak-out-fe-krdm.vercel.app"],
		credentials: true,
	})
);
server.use(express.json());
createSession(server);
initializePassport(passport);

server.use((req, res, next)=>{
	console.log(req)
    req["sessionCookies"].secure = true;
    next();
});


/// LOGIN / SIGNUP / USER ENDPOINTS NEED TO BE REFACTORED INTO IT'S OWN ROUTE
server.post("/register", (req, res) => {
	const hashedPassword = bcrypt.hashSync(req.body.password, 10);
	model
		.addUser({
			user_type: req.body.user_type,
			username: req.body.username,
			password: hashedPassword,
			name: req.body.name || null,
			email: req.body.email || null,
		})
		.then((user) => {
			res.status(201).json({
				message: `The user '${user[0].username}' has successfully been created!`,
			});
		})
		.catch((error) => {
			res.status(500).json({
				message: `There was an error attempting to register user: ${error}.`,
			});
		});
});

server.post(
	"/login",
	passport.authenticate("local", {
		session: true,
	}),
	(req, res) => {
		if (req.isAuthenticated()) {
			res.status(200).json({
				message: "You have successfully logged in",
				username: req.user.username,
				user_type: req.user.user_type,
				user_id: req.user.user_id,
			});
		} else {
			res.status(500).json({ message: "Invalid credentials" });
		}
	}
);

server.get("/user", async (req, res) => {
	console.log("====USER====");
	let userName = req.body ? req.body.username : undefined;
	let userType = req.body.user_type;
	let userId = req.body.user_id;

	res.status(200).json({
		authenticated: req.isAuthenticated(),
		username: userName,
		user_type: userType,
		user_id: userId,
	});
});

server.use(checkAuthenticated);
server.use(authRoutes);
server.use(staffRoutes);
server.use(studentRoutes);
server.use(courseRoutes);
server.use(courseEnrollmentRoutes);
server.use(attendanceRoutes);

///// NEED TO BE REFACTORED INTO A MODEL ETC FOR PARENTS, STAFF REGISTRATION IS COMPLETE!
// -------- Endpoints --------

server.get("/logout", (req, res) => {
	req.logout();
	req.session.destroy();
	res.json({ message: "bye" });
});

//// END OF AUTH REFACTORING

/// THIS IS FINE
server.get("/", (req, res) => {
	res
		.status(200)
		.send(
			"Find API documentation here: https://documenter.getpostman.com/view/8230639/SWTD8wyQ?version=latest#ab443920-3ba6-46b2-bff9-0de953af9172"
		);
});

// STILL USING FEW OF THIS ROUTES IN THE CLIENT ##Old API
server.get("/api", checkAuthenticated, (req, res) => {
	const perPage = req.query.perPage;
	const skip = req.query.skip;
	const table = req.query.table;
	const where = req.query.where;
	const orderBy = req.query.orderBy;

	model
		.findAny(perPage, skip, table, where, orderBy)
		.then((tableData) => {
			res.json({ tableData });
		})
		.catch((error) => {
			res.json({ error: `There was an error: ${error}` });
		});
	// res.status(200).json({ message: 'You were able to pass' });
});

server.get("/where", checkAuthenticated, (req, res) => {
	model
		.find(req.query.table, req.query.where)
		.then((tableData) => {
			tableData = tableData.rows;
			res.json({ tableData });
		})
		.catch((error) => {
			res.json({ error: `There was an error: ${error}` });
		});
	// res.status(200).json({ message: 'You were able to pass' });
});

server.delete("/api", (req, res) => {
	// console.log('delete', req.query)

	model
		.remove(req.query.table, req.query.where)
		.then((removed) => {
			res.status(200).json("number of rows removed: " + removed.rowCount);
		})
		.catch((error) => {
			res.status(500).json(error + "");
		});
});

server.post("/api", (req, res) => {
	//console.log('post', req.query);
	model
		.findBy(req.query.table, model.makeWhere(req.body))
		.then((result) => {
			if (typeof result[0] !== "object") {
				model
					.add(req.query.table, req.body)
					.then((updated) => {
						res.status(201).json(updated.rows);
					})
					.catch((error) => {
						res.status(500).json(error + "");
					});
			} else {
				res.status(201).json(result.rows);
			}
		})
		.catch((error) => {
			res.status(500).json(error + "");
		});
});

server.put("/api", (req, res) => {
	//console.log('put', req.query);
	model
		.update(req.query.table, req.query.where, req.body)
		.then((updated) => {
			res.status(201).json(req.body);
		})
		.catch((error) => {
			res.status(500).json(error + "");
		});
});

server.put("/", (req, res) => {
	//console.log('put', req.query);
	model
		.updateAny(req.query.table, req.query.where, req.body)
		.then((updated) => {
			res.status(201).json(req.body);
		})
		.catch((error) => {
			res.status(500).json(error + "");
		});
});

server.use(globalErrorHandler);
module.exports = server;
