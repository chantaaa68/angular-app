export interface GetIconListResponse {
  iconDatas: IconData[];
}

export interface IconData {
  iconId: number;
  officialIconName: string;
  defaultIconName: string;
}
