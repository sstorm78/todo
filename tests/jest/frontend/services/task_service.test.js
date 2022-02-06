import axios from 'axios';

describe('TaskService', () => {
  test('it should GET list of tasks', async () => {
    const data = [
      {
        id: '1',
        content: 'a',
      },
      {
        id: '2',
        content: 'b',
      },
    ];

    axios.get.mockImplementationOnce(() => Promise.resolve(data));
  });
});
