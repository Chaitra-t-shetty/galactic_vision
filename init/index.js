const mongoose = require('mongoose');
const initData = require("./data.js");
const initStoryData = require("./storydata.js");
const Listing = require("../models/listing.js");
const Story = require("../models/story.js");

main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/exoplanet");
}

const initDB = async () => {
    await Listing.deleteMany({});
    const insertedListings = await Listing.insertMany(initData.data);
    console.log("Listings initialized");

    // Create a mapping of listing titles to their _id
    const listingMap = {};
    insertedListings.forEach(listing => {
        listingMap[listing.title] = listing._id;
    });

    console.log("Listing Map:", listingMap); // Debugging: Check if listingMap has valid _ids

    // Update story data to include the correct listing ObjectId references
    const updatedStories = initStoryData.storydata.map(story => {
        const listingId = listingMap[story.category]; // Use category to fetch the _id
        if (!listingId) {
            console.error(`Error: No matching listing found for ${story.category}`);
        }
        return {
            ...story,
            listing: listingId
        };
    });

    // Ensure no stories are added if they have invalid `listing` references
    const validStories = updatedStories.filter(story => story.listing !== undefined);

    await Story.deleteMany({});
    await Story.insertMany(validStories);
    console.log("Stories initialized");
};

initDB();
