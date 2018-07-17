const _ = require('lodash');
const { User } = require('../models/User');

exports.createUser = (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    const user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.send({
            message: 'Success',
            data: {
                token
            }
        });
    }).catch((e) => {
        console.log(e);
        res.status(400).send({
            message: e
        });
    });
};

exports.loginUser = (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);


    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {

            res.send({
                message: 'Success',
                data: {
                    token
                }
            });
        })
    }).catch((e) => {
        res.status(400).send({
            message: e,
        });
    })

};

exports.getUser = (req, res) => {
    if(!req.user){
        return res.send({
            message: 'Please log in.'
        }).status(401);
    }

    res.send(req.user)
}

exports.logOut = (req, res) =>{
    req.user.removeToken(req.token).then(() =>{
        res.send({
            message: 'Logged out!'
        })
    }).catch((e) =>{
        res.send({
            message: e
        }).status(400);
    })
}