import { Middleware } from '../compose';
import { Context } from '../context';

export type SerializedResponseConfig = {
    /** 默认retCode */
    serializedResponseCodeKey?: string;
    /** 默认retMsg */
    serializedResponseCode?: string;
}
export function serializedResponseMiddleware(option: SerializedResponseConfig = {}): Middleware<Context> {
  const codeKey = option.serializedResponseCodeKey ?? 'retCode';
  const code = option.serializedResponseCode ?? '0';
  return async (ctx, next) => {
    await next();
    if (ctx.success) {
      const { data } = ctx.response || {};
      const value = data?.[codeKey];
      const retCode = typeof value === 'undefined' ? '' : `${value}`;
      if (retCode === code) {
        ctx.response = data;
      } else {
        ctx.success = false;
        ctx.error = data ?? ctx.response;
      }
    }
  };
}
