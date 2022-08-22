import axios, { AxiosRequestConfig } from 'axios';
import { createRequest, FirstParamType, PromiseReturnType } from './createRequest';

const request = (config: AxiosRequestConfig) => axios.create().request(config);
type IF = typeof request;
export const axiosCreateRequest = <
    IC extends FirstParamType<IF> = FirstParamType<IF>,
    IR = PromiseReturnType<IF>,
    >(initConfig?: Partial<IC>) => createRequest<IF, IC, IR>(request, initConfig);

