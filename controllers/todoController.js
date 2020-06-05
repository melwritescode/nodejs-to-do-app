const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const urlencodedParser = bodyparser.urlencoded({ extended: false });
const password = encodeURI('p@ssword123');
const dbname = 'to-do-list';

// DB Configuration
mongoose.connect(`mongodb+srv://melanie:${password}@to-do-list-cv5ob.mongodb.net/${dbname}?retryWrites=true&w=majority`, { 
  useUnifiedTopology: true, 
  useNewUrlParser: true 
});

const todoSchema = new mongoose.Schema({
  item: String
});

const Todo = mongoose.model('Todo', todoSchema);

// Router
const router = (app) => {
  app.get('/todo', getTodos);
  app.post('/todo', urlencodedParser, postTodo);
  app.delete('/todo/:item', deleteTodo);
};

// HTTP Event Handlers
const getTodos = (req, res) => {
  Todo.find({}, (err, todos) => {
    if(err) throw err;
    res.render('todo', { todos });
  });
};

const postTodo = (req, res) => {
  const newItem = req.body;
  Todo(newItem).save((err, todo) => {
    res.json(todo);
  })
};

const deleteTodo = (req, res) => {
  const itemToDelete = req.params.item.replace(/\-/g, " ");
  Todo
  .find({item: itemToDelete})
  .deleteOne((err, item) => {
    if(err) throw err;
    res.json(item);
  })
};

module.exports = router;