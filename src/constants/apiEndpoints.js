export const BACKEND_URL = 'https://tacforce.azurewebsites.net';

export const getMatchEndpoint = (matchId) => ({ method: 'get', url: `/matches/${matchId}` });
export const agentsEndpoint = { method: 'get', url: '/agents' };
