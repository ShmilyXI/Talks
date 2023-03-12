import axios from 'axios';
import { CsrfConfig, csrfMiddleware } from '../../base';

export type AxiosCsrfConfig = Omit<CsrfConfig, 'getRequest'>;

export const axiosCsrfMiddleware = (option: AxiosCsrfConfig) => csrfMiddleware({
  ...option,
  getRequest: axios.create().get,
});

