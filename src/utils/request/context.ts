export type Context<C = any, R = any> = {
    success: boolean;
    config: C;
    response?: R;
    error?: any;
}

export function createContext<C = any, R = any>(config: C): Context<C, R> {
  return {
    config: config,
    success: false,
  };
}
