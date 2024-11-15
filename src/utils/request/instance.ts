import axios from 'axios';
import type {CreateAxiosInstance} from './types';
import {request, response} from './middlewares';

const createAxiosInstance: CreateAxiosInstance = (options = {}) => {
  const {requestMiddlewares, responseMiddlewares, ..._options} = options || {};
  const instance = axios.create(_options);

  instance.interceptors.request.use(request);

  (requestMiddlewares || []).forEach(mw => {
    instance.interceptors.request.use(mw);
  });

  (responseMiddlewares || []).forEach(mw => {
    instance.interceptors.response.use(mw);
  });

  instance.interceptors.response.use(response);

  return instance;
};

export default createAxiosInstance;
