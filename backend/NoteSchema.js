const mongoose=require('mongoose')
const {Schema}=mongoose

const noteSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const note=mongoose.model('note',noteSchema)
module.exports=note