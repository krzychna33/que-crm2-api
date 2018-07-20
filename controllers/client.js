const { Client } = require('../models/Client');

exports.getClients = (req, res) => {
    Client.find({
        traderId: req.user._id
    }).then((docs) => {
        res.send({
            message: 'Success',
            data: docs
        })
    }).catch((e) => {
        res.status(400).send({
            message: e
        })
    })
}

exports.getClient = (req, res) => {
    const clientId = req.params.id;

    Client.find({
        traderId: req.user._id,
        _id: clientId
    }).then((docs) => {
        if(!docs){
            return res.status(404).send({
                message: 'Not found!'
            })
        }
        res.send({
            message: 'Success',
            data: docs
        })
    }).catch((e) => {
        res.status(400).send({
            message: e
        })
    })
}

exports.postClient = (req, res) => {
    const client = new Client({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        location: req.body.location,
        notes: req.body.notes,
        traderId: req.user._id
    })

    client.save().then((docs) => {
        res.send({
            message: 'Client created!',
            data: docs
        })
    }).catch((e) => {
        res.status(400).send({
            message: e
        })
    })
}

exports.putClient = (req, res) => {
    Client.findOneAndUpdate({
        _id: req.params.id,
        traderId: req.user._id
    }, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            location: req.body.location,
            notes: req.body.notes
        }, {
            new: true
        }).then((docs) => {

            if(!docs){
                return res.status(404);
            }
            
            res.send({
                message: 'Success, Client updated!',
                data: docs
            });
        }).catch((e) => {
            res.status(400).send({
                message: e
            });
        })
}

exports.deleteClient = (req, res) => {
    Client.findByIdAndRemove({
        _id: req.params.id,
        traderId: req.user._id
    }).then((docs) => {
        if(!docs){
            return res.status(404);
        }

        res.send({
            message: 'Success, Client deleted!',
            data: docs
        });
    }).catch((e) => {
        res.status(400).send({
            message: e
        });
    })

}