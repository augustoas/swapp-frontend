import axios from 'axios';

import { addInterceptors } from '../interceptor';

const client = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API_AUTH,
});

addInterceptors(client);

export default client;
