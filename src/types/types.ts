export namespace common {
  export interface Pager {
    /** 页码 */
    page?: string;
    /** 页数 */
    page_size?: string;
    /** 总行数 */
    total_rows?: string;
  }

  export interface Request {}

  export interface Response {
    retCode?: string;
    message?: string;
  }
}
