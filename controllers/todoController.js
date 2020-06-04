const bodyparser = require('body-parser');
const urlencodedParser = bodyparser.urlencoded({ extended: false });

let todos = [
  { item: 'laundry' },
  { item: 'walk dog' },
  { item: 'buy groceries' }
];

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