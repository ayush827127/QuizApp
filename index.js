// index.js

const express = require('express');
const bodyParser = require('body-parser');
const quizData = require('./quizData.json');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/quiz', (req, res) => {
  res.json(quizData);
});

app.post('/submit', (req, res) => {
  const userAnswers = req.body;
  let score = 0;

  Object.keys(userAnswers).forEach((questionId) => {
    const selectedOption = userAnswers[questionId];
    const correctOption = quizData[questionId].correctAnswer;

    if (selectedOption === correctOption) {
      score++;
    } 
  });

  res.json({ score });
});

app.listen(port, () => {
  console.log(`Quiz app listening at http://localhost:${port}`);
});
