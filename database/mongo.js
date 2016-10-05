var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = new Schema({
    id: ObjectId,
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String
});

mongoose.connect('mongodb://127.0.0.1:27017/data');

module.exports = mongoose.model('User', User);
