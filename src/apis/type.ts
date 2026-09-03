export interface MicroCMSImage {
  url: string;
  height: number;
  width: number;
}

/** microCMS のリスト形式APIが返す共通のレスポンス */
export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
