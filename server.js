require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname + "/public"));

//FOR DEV
if (process.env.NODE_ENV !== "production") {
    const devConfig = require("./src/config/dev.config");
    devConfig(app);
}
//END DEV

const authRoutes = require("./src/routes/auth.route");
const userRoutes = require("./src/routes/user.route");
const surveyRoutes = require("./src/routes/survey.route");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/pages/home.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/pages/login.html");
});

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/public/pages/signup.html");
});

app.get("/dashboard", (req, res) => {
    res.sendFile(__dirname + "/public/pages/dashboard.html");
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/survey", surveyRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
