import { Context } from '../context';
import { Middleware } from "../types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getPropertyValueToString(data: any, key: string | string[]): string {
  const keys = typeof key === 'string' ? [key] : key;
  const values = keys.map((key) => data?.[key]);
  let result = [...values, ''].find((v) => typeof v !== 'undefined');
  result = `${result}`;
  return result;
}
export type SerializedError<CodeKey extends string, MessageKey extends string> = {
  readonly _isSerializedError: boolean;
  aborted?: boolean;
  _reason: any;
} & Record<CodeKey, string> & Record<MessageKey, string>;
export type SerializedErrorConfig<CodeKey extends string, MessageKey extends string> = {
  /** 默认retCode */
  serializedErrorCodeKey?: CodeKey;
  /** 默认retMsg */
  serializedErrorMessageKey?: MessageKey;
  /** 解析响应的key，默认retCode */
  responseCodeKey?: string | string[];
  /** 解析响应的key，默认retMsg */
  responseMessageKey?: string | string[];
  checkIsCancel: (error: any) => boolean;
  getErrorResponse: (error: any) => any;
  /** message 转换 */
  messageMap?: Record<string, string>;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const serializedError = <C extends string = 'retCode', M extends string = 'message'>(error: any, option: SerializedErrorConfig<C, M>): SerializedError<C, M> => {
  if (error && error._isSerializedError === true) {
    return error;
  }
  const { checkIsCancel, getErrorResponse, messageMap, ...rest } = option;
  const retCodeKey = rest.serializedErrorCodeKey || 'retCode';
  const retMsgKey = rest.serializedErrorMessageKey || 'message';
  const responseCodeKey = rest.responseCodeKey || 'retCode';
  const responseMessageKey = rest.responseMessageKey || 'message';

  const res: SerializedError<string, string> = {
    _isSerializedError: true,
    [retCodeKey]: '',
    [retMsgKey]: '',
    aborted: checkIsCancel(error),
    _reason: error,
  };
  const codeKeys = Array.isArray(responseCodeKey) ? responseCodeKey : [responseCodeKey, 'code', 'status'];
  const msgKeys = Array.isArray(responseMessageKey) ? responseMessageKey : [responseMessageKey, 'message', 'statusText'];

  const response = getErrorResponse(error);
  res[retCodeKey] = getPropertyValueToString(response, codeKeys);
  res[retMsgKey] = getPropertyValueToString(response, msgKeys);

  const msgMap: Record<string, string> = {
    ['Network Error']: '网络错误，请检查网络配置',
    ['ECONNABORTED']: '网络超时，请稍后再试',
    ...messageMap,
  };
  res[retMsgKey] = (msgMap[res[retMsgKey]] ?? res[retMsgKey]) || '系统繁忙，请稍后再试';

  return res;
};
export function serializedErrorMiddleware<C extends string, M extends string>(option: SerializedErrorConfig<C, M>): Middleware<Context> {
  return async (ctx, next) => {
    try {
      await next();
      if (!ctx.success) {
        ctx.error = serializedError(ctx.error, option);
      }
    } catch (error) {
      throw serializedError(error, option);
    }
  };
}

