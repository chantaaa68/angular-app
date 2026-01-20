import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  mockLoginResponse,
  mockUserDataResponse,
  mockUserRegistResponse,
  mockUserUpdateResponse,
  mockCategoryDataResponse,
  mockCategoryRegistResponse,
  mockCategoryUpdateResponse,
  mockSingleCategoryResponse,
  mockIconListResponse,
  mockKakeiboItemListResponse,
  mockKakeiboItemRegistResponse,
  mockMonthlyResultResponse
} from './mock-data';

/**
 * モックインターセプター
 * environment.useMockDataがtrueの場合、実際のAPIリクエストの代わりにモックレスポンスを返します
 */
export const mockInterceptor: HttpInterceptorFn = (req, next) => {
  // モックモードが無効の場合は、通常のリクエストを続行
  if (!environment.useMockData) {
    return next(req);
  }

  console.log('[Mock Interceptor] Intercepting request:', req.method, req.url);

  // URLからエンドポイントを抽出
  const url = req.url;
  const method = req.method;

  // モックレスポンスを返す関数
  const returnMockResponse = (mockData: any): Observable<HttpResponse<any>> => {
    return of(new HttpResponse({
      status: 200,
      body: mockData
    })).pipe(
      delay(environment.mockDelay) // 実際のAPIの動作を模倣するための遅延
    );
  };

  // エンドポイントごとのモックレスポンスマッピング

  // ユーザー関連
  if (url.includes('/User/Login') && method === 'POST') {
    return returnMockResponse(mockLoginResponse);
  }

  if (url.includes('/User/Regist') && method === 'POST') {
    return returnMockResponse(mockUserRegistResponse);
  }

  if (url.includes('/User/GetUserData') && method === 'GET') {
    return returnMockResponse(mockUserDataResponse);
  }

  if (url.includes('/User/Update') && method === 'POST') {
    return returnMockResponse(mockUserUpdateResponse);
  }

  // カテゴリ関連
  if (url.includes('/Category/GetCategoryData') && method === 'GET') {
    return returnMockResponse(mockCategoryDataResponse);
  }

  if (url.includes('/Category/RegistCategory') && method === 'POST') {
    return returnMockResponse(mockCategoryRegistResponse);
  }

  if (url.includes('/Category/UpdateCategory') && method === 'POST') {
    return returnMockResponse(mockCategoryUpdateResponse);
  }

  if (url.includes('/Category/GetSingleCategory') && method === 'GET') {
    return returnMockResponse(mockSingleCategoryResponse);
  }

  // アイコン関連
  if (url.includes('/Icon/GetIconList') && method === 'GET') {
    return returnMockResponse(mockIconListResponse);
  }

  // 家計簿関連
  if (url.includes('/Kakeibo/GetKakeiboItemList') && method === 'GET') {
    return returnMockResponse(mockKakeiboItemListResponse);
  }

  if (url.includes('/Kakeibo/RegistKakeiboItem') && method === 'POST') {
    return returnMockResponse(mockKakeiboItemRegistResponse);
  }

  // 月次レポート関連
  if (url.includes('/Kakeibo/GetMonthlyResult') && method === 'GET') {
    return returnMockResponse(mockMonthlyResultResponse);
  }

  // マッチするエンドポイントがない場合は、デフォルトのエラーレスポンスを返す
  console.warn('[Mock Interceptor] No mock data found for:', method, url);
  return returnMockResponse({
    status: false,
    message: 'Mock endpoint not implemented',
    result: null
  });
};
