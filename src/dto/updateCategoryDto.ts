export interface UpdateCategoryRequest {
  id: number;
  categoryName?: string;
  inoutFlg: boolean;
  iconName: string;
}

export interface UpdateCategoryResponse {
  categoryId: number;
}
