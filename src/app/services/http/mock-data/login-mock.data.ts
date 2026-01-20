import { ApiResponse } from '../../../../dto/ApiResponse';
import { LoginResponse } from '../../../../dto/loginDto';

export const mockLoginResponse: ApiResponse<LoginResponse> = {
  status: true,
  message: 'Login successful',
  result: {
    userId: 1,
    kakeiboId: 100
  }
};
