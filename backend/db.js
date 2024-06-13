const mongoose = require('mongoose');
const mongoURI="mongodb+srv://Rollwala:rollwala@cluster0.zde4mle.mongodb.net/Rolwala_Bsl?retryWrites=true&w=majority"

module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    
        if (err) console.log("---" + err)
        else {
            // var database =
            console.log("connected to mongo")
            const foodCollection = await mongoose.connection.db.collection("roll_bsl");
            foodCollection.find({}).toArray(async function (err, data) {
                const categoryCollection = await mongoose.connection.db.collection("roll_cat");
                categoryCollection.find({}).toArray(async function (err, Catdata) {
                    callback(err, data, Catdata);
                })
            });

        }
    })
};


