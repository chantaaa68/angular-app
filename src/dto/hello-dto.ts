export interface UserDataListResponse {
  users: UserData[];
}

export interface UserData {
  id: number;
  userName: string;
  email: string;
}
