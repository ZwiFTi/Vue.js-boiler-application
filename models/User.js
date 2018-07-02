const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

// encrypt passwords when add user
module.exports.createUser = (newUser, callback) => { 
    bcryptjs.genSalt(10, (err, salt) => { 
        bcryptjs.hash(newUser.password, salt, (error, hash) => { 
            // store the hashed password 
            const newUserResource = newUser; 
            newUserResource.password = hash; 
            newUserResource.save(callback); 
        }); 
    }); 
};

// return the user that has the given email
module.exports.getUserByEmail = (email, callback) => { 
    const query = { email }; 
    User.findOne(query, callback); 
};

// compares password provided by user while logging in
// to the password that is saved in our database
// returns true or false depending on password match
module.exports.comparePassword = (candidatePassword, hash, callback) => { 
    bcryptjs.compare(candidatePassword, hash, (err, isMatch) => { 
        if (err) throw err; 
        callback(null, isMatch); 
    }); 
};