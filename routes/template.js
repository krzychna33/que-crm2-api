const express = require('express');
const router = express.Router();

const templateController = require('../controllers/template');
const { authenticate } = require('../middleware/authenticate');
const { checkPermissions } = require('../middleware/checkPermissions');

router.get('/', authenticate, templateController.getTemplates);
router.get('/:id', authenticate, templateController.getTemplate);
router.post('/', [authenticate, checkPermissions('admin')], templateController.postTemplate);
router.put('/:id', [authenticate, checkPermissions('admin')], templateController.putTemplate);
router.delete('/:id', [authenticate, checkPermissions('admin')], templateController.deleteTemplate);

module.exports = router;