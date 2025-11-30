export interface RegistCategoryRequest {
  userId: number;
  categoryName?: string;
  inoutFlg: boolean;
  iconName: string;
}

export interface RegistCategoryResponse {
  categoryId: number;
}
