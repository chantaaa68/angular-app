export interface LoginRequest {
  email: string;
  userHash: string;
}

export interface LoginResponse {
  userId: number;
  kakeiboId: number;
}
