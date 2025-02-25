require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//FOR DEV
if (process.env.NODE_ENV !== "production") {
    const devConfig = require("./src/config/dev.config");
    devConfig(app);
}
//END DEV

const userRoutes = require("./src/routes/users.route");
const feedbackRoutes = require("./src/routes/surveys.route");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home.html");
});

app.use("/users", userRoutes);
app.use("/feedback", feedbackRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
