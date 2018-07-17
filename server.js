const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config()

const port = process.env.PORT || 8000;
const { mongoose } = require('./config/mongoose');

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/users', require('./routes/user'));
app.use('/api/v1/questionnaires', require('./routes/questionnaire'));
app.use('/api/v1/clients', require('./routes/client'));
app.use('/api/v1/templates', require('./routes/template'));





app.listen(port, () => {
    console.log(`[SERVER] Running on port ${port}`);
})