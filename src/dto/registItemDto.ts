export interface RegistKakeiboItemRequest {
  kakeiboId: number;
  itemName?: string;
  itemAmount: number;
  inoutFlg: boolean;
  usedDate: Date;
  categoryId: number;
  frequency: number;
  fixedEndDate?: Date;
}

export interface RegistKakeiboItemResponse {
  count: number;
}
