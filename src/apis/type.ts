export interface MicroCMSImage {
  url: string;
  height: number;
  width: number;
}

export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
