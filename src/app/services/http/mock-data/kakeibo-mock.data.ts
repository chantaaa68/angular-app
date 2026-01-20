import { ApiResponse } from '../../../../dto/ApiResponse';
import { GetKakeiboItemListResponse, KakeiboItemInfo, Item } from '../../../../dto/getKakeiboItemDto';

const mockKakeiboItems: KakeiboItemInfo[] = [
  {
    dayNo: 1,
    items: [
      { itemId: 1, itemName: 'スーパーで買い物', itemAmount: 3500, inoutFlg: false, usedDate: new Date('2026-01-01'), iconName: 1 },
      { itemId: 2, itemName: '給料', itemAmount: 300000, inoutFlg: true, usedDate: new Date('2026-01-01'), iconName: 6 }
    ]
  },
  {
    dayNo: 5,
    items: [
      { itemId: 3, itemName: 'ガソリン代', itemAmount: 5000, inoutFlg: false, usedDate: new Date('2026-01-05'), iconName: 2 },
      { itemId: 4, itemName: '映画', itemAmount: 1800, inoutFlg: false, usedDate: new Date('2026-01-05'), iconName: 3 }
    ]
  },
  {
    dayNo: 10,
    items: [
      { itemId: 5, itemName: '電気代', itemAmount: 8000, inoutFlg: false, usedDate: new Date('2026-01-10'), iconName: 4 }
    ]
  },
  {
    dayNo: 15,
    items: [
      { itemId: 6, itemName: '病院', itemAmount: 2500, inoutFlg: false, usedDate: new Date('2026-01-15'), iconName: 5 },
      { itemId: 7, itemName: 'レストラン', itemAmount: 4500, inoutFlg: false, usedDate: new Date('2026-01-15'), iconName: 1 }
    ]
  },
  {
    dayNo: 20,
    items: [
      { itemId: 8, itemName: '副業収入', itemAmount: 50000, inoutFlg: true, usedDate: new Date('2026-01-20'), iconName: 7 }
    ]
  }
];

export const mockKakeiboItemListResponse: ApiResponse<GetKakeiboItemListResponse> = {
  status: true,
  message: 'Kakeibo items retrieved successfully',
  result: {
    kakeiboItemInfos: mockKakeiboItems
  }
};

export const mockKakeiboItemRegistResponse: ApiResponse<{ itemId: number }> = {
  status: true,
  message: 'Kakeibo item registered successfully',
  result: {
    itemId: 9
  }
};
