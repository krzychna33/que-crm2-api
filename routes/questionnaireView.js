const express = require('express');
const router = express.Router();

const questionnaireViewController = require('../controllers/questionnaireView');

router.get('/:id', questionnaireViewController.getQuestionnaireView);

module.exports = router;