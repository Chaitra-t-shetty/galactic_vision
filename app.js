const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const Story = require("./models/story.js");
const Quiz = require("./models/quiz.js")
const path = require('path');
const ejsMate = require('ejs-mate');
main()
    .then(()=>{
        console.log("connection successfull");
    })
    .catch((err)=>{
        console.log(err);
    })

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/exoplanet");
}

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "/public")));
app.engine('ejs', ejsMate);

app.get("/",(req,res)=>{
    res.render("user/welcome.ejs");
});

app.get("/about",(req,res)=>{
    res.render("user/about.ejs");
});

app.get("/links",(req,res)=>{
    res.render("user/links.ejs");
});

//Index Route
app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/allPlanets.ejs",{allListings});
});

//show Route
app.get("/listings/:_id",async (req,res)=>{
    let{_id} = req.params;
    //in that ejs i am using listing ryt so populate
    const story = await Story.findOne({ listing: _id }).populate("listing");
    res.render("listings/showPlanets.ejs",{story});
});

//Quiz Route
app.get("/quiz/:category", async (req, res) => {
    try {
        let { category } = req.params;
        category = decodeURIComponent(category);
        const quizQuestions = await Quiz.find({ category: category }); // Fetch all questions in the category
        console.log("Fetched Quiz Questions:", quizQuestions); // Debugging line
        if (quizQuestions.length === 0) {
            return res.status(404).send("Quiz not found");
        }

        res.render("listings/quizPage", { quizQuestions, category });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port , ()=>{
    console.log('Listening on port', port);
})












