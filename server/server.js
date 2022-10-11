require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/user.js'));


mongoose.connect(process.env.URLDB, {useNewUrlParser: true}, (err, res) => {
    if (err) {
        throw err
    };
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('listening on port 3000!')
})


