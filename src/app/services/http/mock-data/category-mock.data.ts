import { ApiResponse } from '../../../../dto/ApiResponse';
import { GetUserCategoryResponse } from '../../../../dto/getUserCategoryDto';
import { CategoryItem } from '../../../../model/categoryItem';

const mockCategories: CategoryItem[] = [
  { id: 1, categoryName: '食費', inoutFlg: false, iconName: 'restaurant' },
  { id: 2, categoryName: '交通費', inoutFlg: false, iconName: 'directions_car' },
  { id: 3, categoryName: '娯楽', inoutFlg: false, iconName: 'sports_esports' },
  { id: 4, categoryName: '光熱費', inoutFlg: false, iconName: 'bolt' },
  { id: 5, categoryName: '医療費', inoutFlg: false, iconName: 'local_hospital' },
  { id: 6, categoryName: '給料', inoutFlg: true, iconName: 'payments' },
  { id: 7, categoryName: '副収入', inoutFlg: true, iconName: 'attach_money' },
  { id: 8, categoryName: 'その他', inoutFlg: false, iconName: 'more_horiz' }
];

export const mockCategoryDataResponse: ApiResponse<GetUserCategoryResponse> = {
  status: true,
  message: 'Categories retrieved successfully',
  result: {
    categories: mockCategories
  }
};

export const mockCategoryRegistResponse: ApiResponse<{ categoryId: number }> = {
  status: true,
  message: 'Category registered successfully',
  result: {
    categoryId: 9
  }
};

export const mockCategoryUpdateResponse: ApiResponse<null> = {
  status: true,
  message: 'Category updated successfully',
  result: null
};

export const mockSingleCategoryResponse: ApiResponse<CategoryItem> = {
  status: true,
  message: 'Category retrieved successfully',
  result: mockCategories[0]
};
