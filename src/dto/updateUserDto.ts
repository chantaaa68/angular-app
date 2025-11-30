export interface UpdateUserRequest {
  userId: number;
  userName: string;
  email: string;
  kakeiboName: string;
  kakeiboExplanation: string;
}

export interface UpdateUserResponse {
  id: number;
}
