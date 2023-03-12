import { CookieParseOptions, CookieSerializeOptions, parse, serialize } from 'cookie';

export type { CookieParseOptions, CookieSerializeOptions } from 'cookie';
export interface ICookieStorage extends globalThis.Storage {
  getItem(key: string, options?: CookieParseOptions): string | null;
  setItem(key: string, value: string, options?: CookieSerializeOptions): void;
}

export class CookieStorage implements ICookieStorage {
  getItem(key: string, options?: CookieParseOptions): string | null {
    const cookies = parse(document.cookie, options);
    const value = cookies[key];
    return typeof value === 'string' ? value : null;
  }
  setItem(key: string, value: string, options?: CookieSerializeOptions): void {
    const text = serialize(key, value, options);
    document.cookie = text;
  }
  removeItem(key: string): void {
    this.setItem(key, '', { maxAge: -1 });
  }
  clear(): void {
    const cookies = parse(document.cookie);
    Object.keys(cookies).forEach((key) => this.removeItem(key));
  }
  get length(): number {
    const cookies = parse(document.cookie);
    return Object.keys(cookies).length;
  }
  key(i: number): string | null {
    const cookies = parse(document.cookie);
    const key = Object.keys(cookies)[i];
    return typeof key === 'string' ? key : null;
  }
}

export const cookieStorage = new CookieStorage();
