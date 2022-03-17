import axios from 'axios';
import { BACKEND_URL } from '../constants/apiEndpoints';

const makeRequest = async (apiEndpoint, dynamicConfig = {}, navigateTo = () => {}) => {
  try {
    const response = await axios({
      ...apiEndpoint,
      url: `${BACKEND_URL}${apiEndpoint.url}`,
      ...dynamicConfig,
    });
    return response.data;
  } catch (err) {
    switch (err.response?.status) {
      case 400: console.log(err.response.data);
        break;
      case 500: navigateTo('/serverError');
        break;
      default: navigateTo('/somethingWrong');
    }
  }
  return [];
};
export default makeRequest;
