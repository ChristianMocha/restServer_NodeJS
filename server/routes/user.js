const express = require('express')
const User = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express()


app.get('/user', function (req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    User.find({state: true}, 'name email img role state google').skip(desde).limit(limite).exec((err, users) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        User.count({state: true}, (err, conteo) => {

            res.json({
                ok: true,
                users,
                length: conteo
            });
        });

    });
                
});
  
app.post('/user', function (req, res) {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });


    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        userDB.password = null;

        res.json({
            ok: true,
            user: userDB
        });
    });

});

app.put('/user/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['name','email','img','role','state']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true}, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });

});
  
app.delete('/user/:id', function (req, res) {
    let id = req.params.id;

    // User.findByIdAndRemove(id, (err, userDeleted) => {

    let updateSate = {
        state: false
    }
    User.findByIdAndUpdate(id, updateSate, { new: true}, (err, userDeleted) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!userDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not found'
                }
            });
        }

        res.json({
            ok: true,
            user: userDeleted
        });
    });
});

module.exports = app;