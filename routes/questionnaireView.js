const express = require('express');
const router = express.Router();

const questionnaireViewController = require('../controllers/questionnaireView');
const { authenticate } = require('../middleware/authenticate');

router.get('/:id', questionnaireViewController.getQuestionnaireView);
router.post('/', questionnaireViewController.postQuestionnaireView);


module.exports = router;