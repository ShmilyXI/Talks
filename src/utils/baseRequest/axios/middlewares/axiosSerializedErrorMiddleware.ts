import axios from 'axios';
import { serializedError, SerializedErrorConfig, serializedErrorMiddleware } from '../../base';




export type AxiosSerializedErrorConfig<CodeKey extends string, MessageKey extends string> = Omit<SerializedErrorConfig<CodeKey, MessageKey>, 'checkIsCancel' | 'getErrorResponse'>;

export const axiosSerializedError = <C extends string = 'retCode', M extends string = 'message'>(error: any, option?: AxiosSerializedErrorConfig<C, M>) => serializedError<C, M>(error, {
  ...option,
  checkIsCancel(error) {
    return axios.isCancel(error);
  },
  getErrorResponse(error) {
    return axios.isAxiosError(error) ? (error.response || error) : error;
  },
});

export function axiosSerializedErrorMiddleware<C extends string, M extends string>(option: AxiosSerializedErrorConfig<C, M>): ReturnType<typeof serializedErrorMiddleware> {
  return async (ctx, next) => {
    try {
      await next();
      if (!ctx.success) {
        ctx.error = axiosSerializedError(ctx.error, option);
      }
    } catch (error) {
      throw axiosSerializedError(error, option);
    }
  };
}
