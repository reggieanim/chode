const Session  = require("../models/session")

exports.sessionCreate = (req, res) => {
    var session = new Session ()

    session.save(function(err, data){
        if(err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
}

exports.sessionOpen = (req, res) => {
    if (req.params.id){
        Session.findOne({
            _id:req.params.id
        }, function(err, data) {
            if(err) {
                console.log(err)
                res.json("session could not be found")
            }
            if(data) {
                res.json({content:data.content, roomId:data._id})
            }
            else {
                console.log(err)
            }
        })
    }
}