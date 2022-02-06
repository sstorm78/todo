import axios from 'axios';

const tasksApiUrl = 'http://localhost:3001/api/tasks';

export function getTaskList() {
  return axios.get(tasksApiUrl);
}

export function createTask(task) {
  return axios.post(tasksApiUrl, task);
}

export function updateTask(id, task) {
  const url = `${tasksApiUrl}/${id}`;
  return axios.put(url, task);
}

export function deleteTask(id) {
  const url = `${tasksApiUrl}/${id}`;
  return axios.delete(url);
}
