import { CategoryItem } from '../model/categoryItem';

export interface GetUserCategoryRequest {
  userId: number;
}

export interface GetUserCategoryResponse {
  categories: CategoryItem[];
}
