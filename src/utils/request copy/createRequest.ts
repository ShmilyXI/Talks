/* eslint-disable space-before-function-paren */
/* eslint-disable require-atomic-updates */
import { compose, Middleware } from "./compose";
import { Context, createContext } from "./context";
import { MiddlewareManager } from "./MiddlewareManager";

export type FirstParamType<T extends (...args: any) => any> = T extends (
  firstParam: infer FP,
  ...args: any[]
) => any
  ? FP
  : any;
export type PromiseReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer PR
  ? PR extends Promise<infer R>
    ? R
    : PR
  : any;

export function createRequest<
  IF extends (...args: any) => any,
  IC extends FirstParamType<IF> = FirstParamType<IF>,
  IR = PromiseReturnType<IF>,
>(requestFunction: IF, initConfig?: Partial<IC>) {
  const requestMiddlewareManager = new MiddlewareManager<Context<IC, IR>>();
  const responseMiddlewareManager = new MiddlewareManager<Context<IC, IR>>();
  const axiosRequest = async <R = IR, C extends IC = IC>(config: C) => {
    const ctx = createContext({
      ...request.defaults,
      ...config,
    });
    try {
      const requestMiddlewares = requestMiddlewareManager.middlewares
        .sort((a, b) => a.priority - b.priority)
        .map((_) => _.middleware);
      const responseMiddlewares = responseMiddlewareManager.middlewares
        .sort((a, b) => a.priority - b.priority)
        .map((_) => _.middleware);
      const requestHandler: Middleware<typeof ctx> = async (context, next) => {
        try {
          const response = await requestFunction(context.config);
          context.response = response;
          context.success = true;
        } catch (error) {
          context.error = error;
          context.success = false;
        }
        await next();
      };
      const composeRequest = compose([
        ...requestMiddlewares,
        requestHandler,
        ...responseMiddlewares,
      ]);
      await composeRequest(ctx);
    } catch (error) {
      ctx.success = false;
      ctx.error = ctx.error ?? error;
    }
    if (ctx.success) {
      return ctx.response as R;
    } else {
      throw ctx.error;
    }
  };
  function request<R = IR, C extends IC = IC>(config: C) {
    return axiosRequest<R, C>(config);
  }
  request.request = axiosRequest;
  request.defaults = { ...initConfig };
  request.middlewares = {
    request: requestMiddlewareManager as Omit<
      typeof requestMiddlewareManager,
      "middlewares"
    >,
    response: responseMiddlewareManager as Omit<
      typeof requestMiddlewareManager,
      "middlewares"
    >,
  };
  request.createApi =
    <R = IR, C extends Partial<IC> = Partial<IC>>(initConfig?: Partial<IC>) =>
    <RR = R, CC extends Partial<IC> = C>(config: Partial<IC>) =>
    (option: Omit<Partial<IC>, keyof CC> & CC) =>
      axiosRequest<RR>({ ...initConfig, ...config, ...option } as Required<CC>);

  return request;
}
