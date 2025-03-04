const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    listing: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Listing",
        required: true
    }
});

module.exports = mongoose.model("Story", storySchema);