import { CookieParseOptions, CookieSerializeOptions, ICookieStorage } from '../cookieStorage';

export interface IStorage extends globalThis.Storage {
  getItem(key: string, options?: CookieParseOptions): any | null;
  setItem(key: string, value: any, options?: CookieSerializeOptions): boolean;
}

export class Storage implements IStorage {
  // 目前支持 implements globalThis.Storage 接口的实例
  public readonly storage: globalThis.Storage | ICookieStorage;
  // 命名空间，多个仓库部署在同一域名的话需配置，防止key冲突
  private readonly namespace: string;
  constructor(storage: globalThis.Storage | ICookieStorage, namespace: string = '') {
    this.storage = storage;
    this.namespace = namespace;
  }
  getItem<T = any>(key: string, options?: CookieParseOptions): T | null {
    try {
      const fullKey = `${this.namespace}${key}`;
      const value = this.storage.getItem(fullKey, options);
      return typeof value === 'string' ? JSON.parse(value) : null;
    } catch (error) {
      return null;
    }
  }
  setItem(key: string, value: any, options?: CookieSerializeOptions): boolean {
    try {
      const fullKey = `${this.namespace}${key}`;
      this.storage.setItem(fullKey, JSON.stringify(value), options);
      return true;
    } catch (error) {
      return false;
    }
  }
  removeItem(key: string): boolean {
    try {
      const fullKey = `${this.namespace}${key}`;
      this.storage.removeItem(fullKey);
      return true;
    } catch (error) {
      return false;
    }
  }
  clear(): void {
    this.keys.forEach((key) => this.removeItem(key));
  }
  get length(): number {
    return this.keys.length;
  }
  key(i: number): string | null {
    const key = this.keys[i];
    return typeof key === 'string' ? key : null;
  }
  private get keys() {
    const allKeys = Array.from({ length: this.storage.length }, (_, i) => this.storage.key(i));
    const keys = allKeys
      .filter((key): key is string => !!(key && key.indexOf(this.namespace) === 0))
      .map((key) => key.substring(this.namespace.length));
    return keys;
  }
}
