const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const feedbackRoutes = require('./routes/feedback')

app.get('/', (req, res) => {
    res.send('<h1>Hello Server!</h1>');
});

app.use("/feedback", feedbackRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});