const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');

const app = express();
const PORT = process.env.PORT;
const connectionString = process.env.MONGO_CONNECTION_STRING

mongoose.connect(connectionString)
        .then(() => console.log('Connected to MongoDB'))
        .catch((e) => {console.log(e.message)});


app.use(express.static('public'));
app.use(express.json());
app.use(express.text());
app.use('/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});