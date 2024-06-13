const mongoose =require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,  // Use 'String' instead of string
        required: true
    },
    location: {
        type: String,
        required:true  // Use 'String' instead of string
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,  // Use 'String' instead of string
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('user',UserSchema) // Export the model as an ES6 module
