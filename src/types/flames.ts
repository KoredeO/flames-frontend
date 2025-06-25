export interface FlamesResult {
  id?: string;
  nameOne: string;
  nameTwo: string;
  result:
    | "Friends"
    | "Lovers"
    | "Affectionate"
    | "Marriage"
    | "Enemies"
    | "Sisters";
  timestamp?: string;
}

export interface FlamesResponse {
  success: boolean;
  data: FlamesResult;
  message?: string;
}

export interface FlamesHistoryResponse {
  success: boolean;
  data: FlamesResult[];
  message?: string;
}
