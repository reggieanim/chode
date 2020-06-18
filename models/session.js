var mongoose = require('mongoose')

var sessionSchema = new mongoose.Schema({
 content: String
})



module.exports = mongoose.model('Session', sessionSchema)