import { Context } from "../context";
import { Middleware } from "../types";

export type LoadingConfig = {
  /** 是否启动全局loading，默认开启 */
  enable?: boolean;
  showLoading: () => void;
  hideLoading: () => void;
  /** 下一针关闭loading优化连续的loading显示--无缝续接👍 */
  hideLoadingNextTick?: boolean;
};
export type LoadingOption = {
  customOptions?: {
    /** 是否启用loading，默认值为：plugin.enable */
    loadingEnabled?: boolean;
  };
};
let requestCount: number = 0;
let delayTimer: any = undefined;
export function loadingMiddleware(option: LoadingConfig): Middleware<Context> {
  const {
    showLoading,
    hideLoading,
    enable = true,
    hideLoadingNextTick,
  } = option;
  const nextTickShowLoading = () => {
    if (hideLoadingNextTick) {
      if (typeof delayTimer === "undefined") {
        requestCount === 0 && showLoading();
      }
    } else {
      requestCount === 0 && showLoading();
    }
  };
  const nextTickHideLoading = () => {
    if (hideLoadingNextTick) {
      clearTimeout(delayTimer);
      delayTimer = setTimeout(() => {
        delayTimer = undefined;
        requestCount === 0 && hideLoading();
      });
    } else {
      requestCount === 0 && hideLoading();
    }
  };
  return async (ctx, next) => {
    const { customOptions: { loadingEnabled: isShowLoading = enable } = {} } =
      ctx.config as LoadingOption;
    if (isShowLoading) {
      nextTickShowLoading();
      requestCount += 1;
    }
    try {
      await next();
      if (isShowLoading) {
        requestCount -= 1;
        requestCount = Math.max(requestCount, 0);
        nextTickHideLoading();
      }
    } catch (error) {
      if (isShowLoading) {
        requestCount -= 1;
        requestCount = Math.max(requestCount, 0);
        nextTickHideLoading();
      }
      throw error;
    }
  };
}
