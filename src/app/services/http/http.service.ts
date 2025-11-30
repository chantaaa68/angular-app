import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../../dto/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // ベースURL (環境変数 environment.ts から取得するのが一般的ですが、ここでは直書き例)
  // private baseUrl = environment.apiUrl;
  private baseUrl = environment.apiUrl + 'api';

  constructor(private http: HttpClient) {}

  /**
   * 汎用 GET メソッド
   * @param path APIのエンドポイント (例: '/items')
   * @param params クエリパラメータ (任意)
   * @returns ApiResponse<T> 指定された型のレスポンス
   */
  public async get<T>(
    path: string,
    params?:
      | HttpParams
      | {
          [param: string]:
            | string
            | number
            | boolean
            | readonly (string | number | boolean)[];
        }
  ): Promise<ApiResponse<T>> {
    try {
      //エラー返却時に、落ちてしまうのでtry-catchで囲む
      const response = await this.http.get<ApiResponse<T>>(
        `${this.baseUrl}${path}`,
        {
          params,
        }
      );
      return await firstValueFrom(response);
    } catch (error: any) {
      // エラーの場合も、帰ってきたレスポンスを取得する
      const response = error.error as ApiResponse<T>;
      return response;
    }
  }

  /**
   * 汎用 POST メソッド
   * @param path APIのエンドポイント
   * @param body 送信するデータ
   * @returns ApiResponse<T> 指定された型のレスポンス
   */
  public async post<T>(path: string, body: any): Promise<ApiResponse<T>> {
    try {
      //エラー返却時に、落ちてしまうのでtry-catchで囲む
      const response = await this.http.post<ApiResponse<T>>(
        `${this.baseUrl}${path}`,
        body
      );
      return await firstValueFrom(response);
    } catch (error: any) {
      // エラーの場合も、帰ってきたレスポンスを取得する
      const response = error.error as ApiResponse<T>;
      return response;
    }
  }
}
