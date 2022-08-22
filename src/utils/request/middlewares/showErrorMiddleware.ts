import { Context } from '../context';
import { Middleware } from "../types";

export type ShowErrorConfig = {
    /** 是否启动全局showError，默认开启 */
    enable?: boolean;
    /** 发生错误时执行，`return false`可阻止后续的showError函数执行 */
    handleError?: (
      err: any,
      ctx: Context
    ) => void | false;
    /** cancel时不会触发 */
    showError: (err: any, ctx: Context) => void;
  };
export type ShowErrorOption = {
    customOptions?: {
      /** 是否启用loading，默认值为：plugin.enable */
      errorEnabled?: boolean;
      /** 可替换全局showError */
      showError?: (err: any, ctx: Context) => void;
    };
  }
export function showErrorMiddleware(
  option: ShowErrorConfig,
): Middleware<Context> {
  const { showError, handleError, enable = true } = option;
  return async (ctx, next) => {
    const {
      customOptions: { errorEnabled: isShowError = enable, showError: requestShowError } = {},
    } = ctx.config as ShowErrorOption;
    function runError(err: any, ctx: any) {
      const bool = handleError?.(err, ctx);
      if (bool !== false) {
        if (isShowError) {
          requestShowError ? requestShowError(err, ctx) : showError(err, ctx);
        }
      }
    }
    try {
      await next();
      if (!ctx.success) {
        runError(ctx.error, ctx);
      }
    } catch (error) {
      runError(error, ctx);
      throw error;
    }
  };
}

