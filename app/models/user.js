
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	username: { type:String, lowercase: true, required: true, unique: true }, 
	password: {type:String, required: true },
	email: {type: String, required: true, lowercase: true , unique: true }
});

UserSchema.pre('save', function(next) {
	var user = this;
	bcrypt.hash(user.password, null,null, function(err, hash) {
		if(err) return next (err);
		user.password = hash;
		next();
	});
});

module.exports = mongoose.model('User', UserSchema);

var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});