import { Injectable } from '@angular/core';
import { CategoryItem } from '../../../model/categoryItem';
import { HttpParams } from '@angular/common/http';
import { GetUserCategoryResponse } from '../../../dto/getUserCategoryDto';
import { ApiResponse } from '../../../dto/ApiResponse';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  /**
   * 選択状態のアイテム
   */
  public selectedCategory: CategoryItem | null = null;

  constructor(private http: HttpService) {}

  /**
   * 表示するカテゴリを変更する
   * @param event
   */
  public inoutCategoryChange(
    items: CategoryItem[],
    inoutCheck: boolean
  ): CategoryItem[] {
    const inOutCategories: CategoryItem[] = items.filter(
      (items) => items.inoutFlg === inoutCheck
    );

    return inOutCategories;
  }

  /**
   * ユーザー登録カテゴリ一覧を取得する
   */
  public async getUserCategory(
    userId: number,
    defaultFlg: boolean
  ): Promise<CategoryItem[]> {
    const httpParams = new HttpParams()
      .set('userId', userId)
      .append('defaultFlg', defaultFlg);

    //リクエスト実施
    const response: ApiResponse<GetUserCategoryResponse> =
      await this.http.get<GetUserCategoryResponse>(
        '/Category/GetCategoryData',
        httpParams
      );

    return response.result.categories;
  }

  /**
   * 選択されたアイテムを保持する
   * @param item
   */
  public setSelectedCategory(item: CategoryItem): void {
    this.selectedCategory = item;
  }
}
