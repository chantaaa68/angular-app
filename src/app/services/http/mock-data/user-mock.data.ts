import { ApiResponse } from '../../../../dto/ApiResponse';
import { GetUserDataResponse } from '../../../../dto/getUserDataDto';

export const mockUserDataResponse: ApiResponse<GetUserDataResponse> = {
  status: true,
  message: 'User data retrieved successfully',
  result: {
    userName: 'テストユーザー',
    email: 'test@example.com',
    kakeiboName: 'テスト家計簿',
    kakeiboExplanation: 'これはテスト用の家計簿です'
  }
};

export const mockUserRegistResponse: ApiResponse<{ userId: number; kakeiboId: number }> = {
  status: true,
  message: 'User registered successfully',
  result: {
    userId: 1,
    kakeiboId: 100
  }
};

export const mockUserUpdateResponse: ApiResponse<null> = {
  status: true,
  message: 'User updated successfully',
  result: null
};
