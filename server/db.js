const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://admin:RSB0phHI78FAAb6H@cluster0.6qegdyn.mongodb.net/"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    .then(function(){
        console.log("Connected to Mongo Successfully")
    })
    .catch(function(err){
        console.log(err)

    })
        
    
}

module.exports = connectToMongo;