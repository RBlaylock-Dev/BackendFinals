const Controller = require("../controllers/AuthController")
const MiddleWare = require("../middleware/authCheck")


module.exports = (app) => {

    app.post("/register", Controller.register)

    app.post("/login", Controller.login)

    // route to check auth from the Protected Route in React
    app.get("/authCheck", MiddleWare, Controller.authCheck)


}