import axios from 'axios';

const makeRequest = async (apiEndpoint, dynamicConfig) => {
  const { data } = await axios({ ...apiEndpoint, ...dynamicConfig });
  return data;
};
export default makeRequest;
