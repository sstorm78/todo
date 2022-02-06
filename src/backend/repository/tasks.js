const knex = require('knex');
const knexfile = require('./knexfile');

const config = knexfile[process.env.NODE_ENV || 'development'];
const db = knex(config);

const list = async (request, response, next) => {
  try {
    await db.select('*')
      .from('tasks')
      .then((result) => {
        response.status(200).json(result);
      });
  } catch (err) {
    next(err);
  }
};

const create = async (request, response, next) => {
  try {
    db('tasks').insert({
      content: request.body.content,
      created_on: new Date(),
    })
      .then(() => {
        response.status(201).send();
      });
  } catch (err) {
    next(err);
  }
};

const update = async (request, response, next) => {
  const id = parseInt(request.params.id, 10);

  try {
    db('tasks')
      .where('id', id)
      .update({
        content: request.body.content,
        completed: request.body.completed,
      })
      .then((result) => {
        if (result === 1) {
          response.status(200).send();
        } else {
          response.status(404).send();
        }
      });
  } catch (err) {
    next(err);
  }
};

const remove = async (request, response, next) => {
  const id = parseInt(request.params.id, 10);

  try {
    db('tasks')
      .where('id', id)
      .del()
      .then((result) => {
        if (result === 1) {
          response.status(200).send();
        } else {
          response.status(404).send();
        }
      });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  list, create, update, remove,
};
