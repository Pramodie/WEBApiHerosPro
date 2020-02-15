const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    birthName:{
        type:String,
        minlength:3,
        maxlength:20,
    },
    //name : String,
    //birthName : String,
    likeCount : Number,
    //deceased : Boolean,
    deceased:{
        type:Boolean,
        default:false
    },
    //superPowers : [String],
    superPowers:{
        type:[String],
        enum:['invisible','flying']
    },
    movies : [String]
});

const Hero = mongoose.model("Hero",heroSchema);

module.exports = Hero;