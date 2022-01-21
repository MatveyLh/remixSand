const express = require('express');

const app = express();

app.post('/get/mock/data', function (req, res) {
    res.send('Hello Remix');
})
