const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    image : {
        default :"../images/gasgiant.jpg",
        type:String,
        set : (v)=> v===""?"../images/gasgiant.jpg":v,
    },
    title :{
        type:String,
        required:true,
    } ,
    description: { 
        type: String, 
        required: true 
    }
});

const Listing = mongoose.model("Listing",ListingSchema);
module.exports = Listing;