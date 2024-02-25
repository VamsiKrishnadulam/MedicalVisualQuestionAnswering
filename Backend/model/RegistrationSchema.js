const mongoose=require('mongoose');


const registrationSchema=new mongoose.Schema({
    
    Password:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    }
})

const User = mongoose.model("Registration",registrationSchema);
module.exports=User;