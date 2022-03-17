import axios from 'axios';
import { BACKEND_URL } from '../constants/apiEndpoints';

const makeRequest = async (apiEndpoint, dynamicConfig) => {
  const { data } = await axios({ ...apiEndpoint, url: `${BACKEND_URL}${apiEndpoint.url}`, ...dynamicConfig });
  return data;
};
export default makeRequest;
