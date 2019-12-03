// import User from '../sequelize';
const jwtSecret = require('./../../config/jwtConfig');
const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = app => {

    var User = app.models.user;

    app.post('/registerUser', (req, res, next) => {
        passport.authenticate('register', (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info != undefined) {
                console.log(info.message);
                res.send(info.message);
            } else {
                req.logIn(user, err => {
                    const data = {
                        nome: req.body.nome,
                        username: user.username,
                    };
                    User.findOne({ username: data.username }).then(user => {
                        user.update({
                            nome: data.nome
                        })
                            .then(() => {
                                console.log('user created in db');
                                res.status(200).send({ message: 'user created' });
                            });
                    });
                });
            }
        })(req, res, next);
    });

    app.post('/loginUser', (req, res, next) => {
        passport.authenticate('login', (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info != undefined) {
                console.log(info.message);
                res.send(info.message);
            } else {
                req.logIn(user, err => {
                    User.findOne({ username: user.username }).then(user => {
                        const token = jwt.sign({ id: user.username }, jwtSecret.secret, {expiresIn: 60*5});
                        res.status(200).send({
                            auth: true,
                            token: token,
                            message: 'user found & logged in',
                        });
                    });
                });
            }
        })(req, res, next);
    });


    app.get('/findUser', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info !== undefined) {
                console.log(info.message);
                res.status(401).send(info.message);
            } else if (user.username === req.query.username) {
                User.findOne({username: req.query.username}).then((userInfo) => {
                    if (userInfo != null) {
                        console.log('user found in db from findUsers');
                        res.status(200).send({
                            auth: true,
                            nome: userInfo.nome,
                            username: userInfo.username,
                            password: userInfo.password,
                            message: 'user found in db',
                        });
                    } else {
                        console.error('no user exists in db with that username');
                        res.status(401).send('no user exists in db with that username');
                    }
                });
            } else {
                console.error('jwt id and username do not match');
                res.status(403).send('username and jwt token do not match');
            }
        })(req, res, next);
    });

};