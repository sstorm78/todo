const express = require('express');
const cors = require('cors');
const db = require('./repository/tasks');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get('/', (request, response) => {
  response.json({ info: 'Welcome to To Do App API' });
});

app.get('/api/tasks', db.list);
app.post('/api/tasks', db.create);
app.put('/api/tasks/:id', db.update);
app.delete('/api/tasks/:id', db.remove);

app.listen(port, () => {});
