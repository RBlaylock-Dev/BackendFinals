const Controller = require("../controllers/ToDoController")
const authCheck = require("../middleware/authCheck")


module.exports = (app) => {

    app.get("/getTodos", authCheck, Controller.getToDos)

    app.post("/create", authCheck, Controller.create)

    app.delete("/delete/:id", authCheck, Controller.delete)

    app.get("/test", authCheck, Controller.test)

    app.put("/edit/:id", authCheck, Controller.update)

}