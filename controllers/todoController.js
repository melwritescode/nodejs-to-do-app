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

const itemOne = Todo({item: 'make dinner reservations'}).save(err => {
  if(err) throw err;
  console.log('item saved');
});

// Dummy Data
let todos = [
  { item: 'laundry' },
  { item: 'walk dog' },
  { item: 'buy groceries' }
];

// Router
const router = (app) => {
  app.get('/todo', getTodos);
  app.post('/todo', urlencodedParser, postTodo);
  app.delete('/todo/:item', deleteTodo);
};

// HTTP Event Handlers
const getTodos = (req, res) => {
  res.render('todo', { todos });
};

const postTodo = (req, res) => {
  todos.push(req.body);
  res.json(todos);
};

const deleteTodo = (req, res) => {
  const itemToDelete = req.params.item;

  todos = todos.filter(idx => {
    const item = idx.item.replace(/ /g, '-')
    return item !== itemToDelete;
  })
  res.json(todos);
};

module.exports = router;