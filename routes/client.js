const express = require('express');
const router = express.Router();

const clientController = require('../controllers/client');
const { authenticate } = require('../middleware/authenticate');

router.get('/', authenticate, clientController.getClients);
router.get('/:id', authenticate, clientController.getClient);
router.post('/', authenticate, clientController.postClient);
router.put('/:id', authenticate, clientController.putClient);
router.delete('/:id', authenticate, clientController.deleteClient);


module.exports = router;