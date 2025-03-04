const mongoose = require("mongoose");
const Quiz = require("../models/quiz"); // Ensure correct path

const quizData = [
    // Gas Giant
    { category: "Gas Giant", question: "Exoplanets fall into how many broad categories?", options: ["2", "4", "3", "5"], answer: "4" },
    { category: "Gas Giant", question: "A gas giant is a large planet mostly composed of ________", options: ["Helium", "Hydrogen", "Both", "Oxygen"], answer: "Both" },
    { category: "Gas Giant", question: "Which is the first Exoplanet discovered?", options: ["51 Pegasi b", "KELT-9 b", "Jupiter", "HIP 67522 b"], answer: "51 Pegasi b" },
    { category: "Gas Giant", question: "Which is called 'ultra-hot Jupiter', and is the hottest known Exoplanet?", options: ["51 Pegasi b", "Sun", "KELT-9b", "Saturn"], answer: "KELT-9b" },
    { category: "Gas Giant", question: "Which Exoplanet is about the same age as our Sun?", options: ["51 Pegasi b", "KELT-9b", "Jupiter", "HIP 11915"], answer: "HIP 11915" },
    { category: "Gas Giant", question: "Which Exoplanet is also called Dimidium?", options: ["51 Pegasi b", "KELT-9b", "Jupiter", "HIP 11915"], answer: "51 Pegasi b" },
    { category: "Gas Giant", question: "What is the surface temperature of Dimidium?", options: ["1000-1800°C", "538-982°C", "500-1000°C", "100-500°C"], answer: "538-982°C" },
    { category: "Gas Giant", question: "Which planet is the youngest known hot Jupiter?", options: ["51 Pegasi b", "KELT-9b", "Jupiter", "HIP 67522b"], answer: "HIP 67522b" },

    // Neptunian
    { category: "Neptunian Planet", question: "Neptunian planets are of the same size as _________?", options: ["Neptune or Uranus", "Jupiter or Saturn", "Mercury or Venus", "Earth or Mars"], answer: "Neptune or Uranus" },
    { category: "Neptunian Planet", question: "What is the composition of the core of the Neptunian Planets?", options: ["rock and minerals", "minerals and non-metals", "rock and heavier metals", "none of the above"], answer: "rock and heavier metals" },
    { category: "Neptunian Planet", question: "Which is the region close to stars where we should find Neptunian Planets?", options: ["cold Neptune desert", "hot Neptune desert", "hot Jupiter desert", "hot Saturn desert"], answer: "hot Neptune desert" },
    { category: "Neptunian Planet", question: "When the planet passes in front of its star, what filters some of the starlight?", options: ["hydrogen cloud", "helium cloud", "lithium cloud", "sulphur cloud"], answer: "hydrogen cloud" },
    { category: "Neptunian Planet", question: "GJ 3470b has already lost up to how much of its atmosphere?", options: ["35%", "20%", "99%", "85%"], answer: "35%" },

    // Super Earth
    { category: "Super Earth", question: "Mercury : 88 days :: K2-131b : _________", options: ["9 hours", "9 days", "9 months", "9 years"], answer: "9 hours" },
    { category: "Super Earth", question: "What would it be like on the surface of K2-131b?", options: ["Molten rocks", "Rivers of vaporized metal", "Both", "Something else"], answer: "Both" },
    { category: "Super Earth", question: "Super-Earths can be ________ ?", options: ["Rocky", "Gaseous", "Only rocky", "Both"], answer: "Both" },
    { category: "Super Earth", question: "Which planets are among our best candidates for finding life beyond Earth?", options: ["Super-Earths", "Gas Giants", "Neptunians", "None"], answer: "Super-Earths" },
    { category: "Super Earth", question: "Studying Super-Earths:?", options: ["Tells us extreme limits of planetary environments", "Gives hope for potential life", "Challenge our understanding of biology and what constitutes life", "All"], answer: "All" },

    // Terrestrial
    { category: "Terrestrial Planet", question: "Which of the following are Terrestrial Exoplanets?", options: ["OGLE-2013-BLG-0341b", "Trappist-1", "Kepler-11 b", "All"], answer: "All" },
    { category: "Terrestrial Planet", question: "Which planet orbits a binary star system which is 3000 light-years away in the direction of Sagittarius Constellation?", options: ["OGLE-2013-BLG-0341b", "Trappist-1", "Kepler-11 b", "None of the above"], answer: "OGLE-2013-BLG-0341b" },
    { category: "Terrestrial Planet", question: "Which is one of the crowned jewels of recent exoplanet discoveries?", options: ["OGLE-2013-BLG-0341b", "Trappist-1", "Kepler-11 b", "None of the above"], answer: "Trappist-1" },
    { category: "Terrestrial Planet", question: "Trappist is found in which constellation?", options: ["Aquarius", "Capricorn", "Aries", "Sagittarius"], answer: "Aquarius" },
    { category: "Terrestrial Planet", question: "Which Terrestrial Exoplanet has a denser iron core and possibly liquid water?", options: ["Trappist-1e", "Trappist-1b", "Trappist-1f", "Trappist-1g"], answer: "Trappist-1e" },
    { category: "Terrestrial Planet", question: "Which system was the first to show us that multiple planets could form and exist in close orbits around a single star?", options: ["Keppler-11", "Kepler-11b", "Trappist-1f", "Trappist-1g"], answer: "Kepler-11" }
];

const seedDatabase = async () => {
    try {
        await Quiz.deleteMany({});
        console.log("Old quiz data deleted.");

        await Quiz.insertMany(quizData);
        console.log("Quiz data inserted successfully.");
    } catch (error) {
        console.error("Error inserting quiz data:", error);
    } finally {
        mongoose.connection.close();
    }
};

// Connect to MongoDB and run script
mongoose.connect("mongodb://127.0.0.1:27017/exoplanet", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB.");
    seedDatabase();
}).catch(err => {
    console.error("MongoDB connection error:", err);
});
