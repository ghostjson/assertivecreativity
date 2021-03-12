export interface FileStoreState {
  files: { [key: number]: FileStoreObj };
}

export interface FileStoreObj {
  id: number;
  file?: File | string;
  url?: string;
  size?: number | string;
  name?: string;
}
