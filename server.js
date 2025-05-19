require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
global.__basedir = __dirname;

app.use(express.json());
app.use(express.static(__dirname + "/public"));

//FOR DEV
if (process.env.NODE_ENV !== "production") {
    const devConfig = require("./src/config/dev.config");
    devConfig(app);
}
//END DEV

const authRoutes = require("./src/routes/auth.route");
const userRoutes = require("./src/routes/users.route");
const surveyRoutes = require("./src/routes/surveys.route");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/pages/home.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/pages/login.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/pages/signup.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/pages/dashboard.html"));
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/surveys", surveyRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
