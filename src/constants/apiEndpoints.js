export const BACKEND_URL = 'http://localhost:3000';
export const getTasksInList = (listId) => ({ method: 'get', url: `/${listId}` });
