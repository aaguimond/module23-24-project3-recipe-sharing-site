const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Defining the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Regex to match email: any character(s) + @ + any character(s) + . + any character(s)
        match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
}, {
    // Enable virtuals and getters
    toJSON: {
        virtuals: true,
        getters: true
    },
});

// Hashing the password before saving to the db, defining callback function to advance to
// next process after hashing
userSchema.pre('save', async function(next) {
    // Only hash if we need to save (if the password is new or modified)
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    // Calling next process to begin
    next();
});

// Checking if user-entered password is correct by comparing it to the one in our db
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

// Defining our user model from our schema
const User = mongoose.model('User', userSchema);

// exporting the user model
module.exports = User;