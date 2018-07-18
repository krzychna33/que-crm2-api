const express = require('express');
const router = express.Router();

const questionnaireController = require('../controllers/questionnaire');
const { authenticate } = require('../middleware/authenticate');

router.get('/', authenticate, questionnaireController.getQuestionnaires);
router.get('/:id', authenticate, questionnaireController.getQuestionnaire);
router.post('/', authenticate, questionnaireController.postQuestionnaire);
router.put('/:id', authenticate, );
router.delete('/:id', authenticate, );

module.exports = router;