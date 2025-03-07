const Controller = require("../controllers/ToDoController")
const authCheck = require("../middleware/authCheck")
const AuthController = require("../controllers/AuthController")


module.exports = (app) => {

    app.post("/register", AuthController.register)

    app.post("/login", AuthController.login)

    // route to check auth from the Protected Route in React
    app.get("/authCheck", authCheck, AuthController.authCheck)

    app.get("/getTodos", authCheck, Controller.getToDos)

    app.post("/create", authCheck, Controller.create)

    app.delete("/delete/:id", authCheck, Controller.delete)

    app.get("/test", authCheck, Controller.test)

    app.put("/edit/:id", authCheck, Controller.update)

}