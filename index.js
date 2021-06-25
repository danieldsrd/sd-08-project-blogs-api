const express = require('express');
const userController = require('./controllers/userController');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', userController);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
