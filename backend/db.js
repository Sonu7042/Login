const mongoose = require('mongoose')

const link = "mongodb+srv://admin:RSB0phHI78FAAb6H@cluster0.6qegdyn.mongodb.net/"

const mongoConnect = () => {
    mongoose.connect(link)
        .then(function () {
            console.log("db is connected")
        })
        .catch(function (err) {
            console.log(err)
        })
        

}

module.exports=mongoConnect


