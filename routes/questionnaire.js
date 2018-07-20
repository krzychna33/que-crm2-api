const express = require('express');
const router = express.Router();

const questionnaireController = require('../controllers/questionnaire');
const { authenticate } = require('../middleware/authenticate');

router.get('/', authenticate, questionnaireController.getQuestionnaires);
router.get('/:id', authenticate, questionnaireController.getQuestionnaire);
router.post('/', authenticate, questionnaireController.postQuestionnaire);
router.put('/:id', authenticate, questionnaireController.putQuestionnaire);
router.delete('/:id', authenticate, questionnaireController.deleteQuestionnaire);

router.get('/get-results/:id', authenticate, questionnaireController.getResults);

module.exports = router;