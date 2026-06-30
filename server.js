const express = require('express');

const app = express();
const PORT = process.env.PORT;

app.use(express.static('public'));
app.use(express.json());
app.use(express.text());

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});