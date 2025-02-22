const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categoryController = require('./controllers/categoryController');
const blogPostController = require('./controllers/blogPostController');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', userController);
app.use('/login', loginController);
app.use('/categories', categoryController);
app.use('/post', blogPostController);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
