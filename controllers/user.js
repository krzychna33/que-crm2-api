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

exports.deleteUser = (req, res) => {
    if(req.params.id == req.user._id){
        return res.status(403).send({
            message: 'You cant remove your own account!',
        })
    }

    User.findOneAndRemove({
        _id: req.params.id,
        role: 'trader'
    }).then((docs) =>{
        if(!docs){
            return res.status(404).send();
        }
        res.send({
            message: `Account ${docs.email} deleted!`
        })
    }).catch((e) =>{
        res.status(404).send({
            message: e
        })
    })
}