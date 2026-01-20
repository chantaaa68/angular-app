import { ApiResponse } from '../../../../dto/ApiResponse';
import { GetIconListResponse, IconData } from '../../../../dto/getIconDto';

const mockIcons: IconData[] = [
  { iconId: 1, officialIconName: 'restaurant', defaultIconName: '食事' },
  { iconId: 2, officialIconName: 'directions_car', defaultIconName: '車' },
  { iconId: 3, officialIconName: 'sports_esports', defaultIconName: 'ゲーム' },
  { iconId: 4, officialIconName: 'bolt', defaultIconName: '電気' },
  { iconId: 5, officialIconName: 'local_hospital', defaultIconName: '病院' },
  { iconId: 6, officialIconName: 'payments', defaultIconName: '給料' },
  { iconId: 7, officialIconName: 'attach_money', defaultIconName: 'お金' },
  { iconId: 8, officialIconName: 'more_horiz', defaultIconName: 'その他' },
  { iconId: 9, officialIconName: 'shopping_cart', defaultIconName: '買い物' },
  { iconId: 10, officialIconName: 'home', defaultIconName: '家' },
  { iconId: 11, officialIconName: 'school', defaultIconName: '学校' },
  { iconId: 12, officialIconName: 'flight', defaultIconName: '旅行' },
  { iconId: 13, officialIconName: 'fitness_center', defaultIconName: 'フィットネス' },
  { iconId: 14, officialIconName: 'book', defaultIconName: '本' },
  { iconId: 15, officialIconName: 'phone', defaultIconName: '電話' }
];

export const mockIconListResponse: ApiResponse<GetIconListResponse> = {
  status: true,
  message: 'Icons retrieved successfully',
  result: {
    iconDatas: mockIcons
  }
};
