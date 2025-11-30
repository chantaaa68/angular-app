export interface GetKakeiboItemListResponse {
  kakeiboItemInfos: KakeiboItemInfo[];
}

export interface KakeiboItemInfo {
  dayNo: number;
  items: Item[];
}

export interface Item {
  itemId: number;
  itemName: string;
  itemAmount: number;
  inoutFlg: boolean;
  usedDate: Date;
  iconName: number;
}
