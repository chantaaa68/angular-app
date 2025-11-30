export interface User {
  userName: string;
  email: string;
}

export interface UserRegisterRequest {
  userName: string;
  userHash: string;
  email: string;
  kakeiboName: string;
  kakeiboExplanation: string;
}

export interface UserRegisterResponse {
  id: number;
}
