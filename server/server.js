require('./config/config.js');
const express = require('express')
const bodyParser = require('body-parser')


const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/user', function (req, res) {
  res.json('Hello World GET')
});

app.post('/user', function (req, res) {
    let body = req.body;

    if (body.name === undefined) {
        res.status(400).json({
            ok: false,
            message: 'The name is required'
        });
    } else {
        res.json({
            persona: body
        });
    }

});

app.put('/user/:id', function (req, res) {
    let id = req.params.id;
    res.json({
        id
    });
//   res.json('Hello World PUT')
});

app.delete('/user', function (req, res) {
  res.json('Hello World DELETE')
});

app.listen(process.env.PORT, () => {
    console.log('listening on port 3000!')
})