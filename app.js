const express = require('express');
const app = express();
const toDoController = require('./controllers/todoController');

app.set('view engine', 'ejs');

app.use(express.static('./public'));

toDoController(app);

app.listen(3000);
console.log('NodeJS To Do App is listening on port 3000');