const ToDo = require("../models/ToDo")


module.exports = {

    getToDos: (req, res) => {
        console.log("getTodos HIT")
        ToDo.find()
            .then(found => {
                console.log("Found", found)
                res.json(found)
            })
    },

    create: (req, res) => {
        console.log("Create Route HIT", req.body)
        ToDo.create(req.body)
            .then(created => {
                console.log("created", created)
                res.json(created)
            })
    
    
    
    },

    delete: (req, res) => {
        console.log("Delete HIT", req.params)
        ToDo.findByIdAndDelete(req.params.id)
            .then(deleted => {
                console.log("deleted", deleted)
                res.json(deleted)
            })
            .catch(err => console.log(err));
    },
    
    update: (req, res) => {
        console.log("Update route hit", req.params.id)
        ToDo.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(updated => {
            console.log("Updated", updated)
            res.json(updated)
        })
        .catch(err => console.log(err))
    },

    test: (req, res) => {
        console.log("Test route hit")
        res.json({ msg: "success" })
    }

}
