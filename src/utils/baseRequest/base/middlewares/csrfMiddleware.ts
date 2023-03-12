import { Context } from '../context';
import { Middleware } from '../compose';

export type CsrfConfig = {
  csrfTokenApi: string;
  getRequest: (url: string) => Promise<any>;
};
export function csrfMiddleware(option: CsrfConfig): Middleware<Context> {
  const { csrfTokenApi, getRequest } = option;
  getRequest(csrfTokenApi).catch((err) => {
    console.error('setCsrfToken fail: ', err);
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (_, next) => await next();
}


