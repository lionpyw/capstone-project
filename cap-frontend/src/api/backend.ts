import axios from 'axios';



interface CreateLiveVideoRequestData {
  consultant: number;
}

export interface LiveVideoRequest {
  id: number;
  consultant: number;
  dyte_meeting_id: string;
  status: "PENDING" | "ACTIVE" | "DONE";
  consultant_meeting_id: string
}

export const createLiveVideoRequest = async (
  data: CreateLiveVideoRequestData,
): Promise<LiveVideoRequest> => {
  const response = await axios.post(`consult/live-requests/`, data);
  return response.data;
};

export const listLiveVideoRequest = async (): Promise <LiveVideoRequest[]> => {
  const response = await axios.get(`consult/live-requests/`);
  return response.data;
}

export const retrieveLiveVideoRequest = async (id:number|undefined): Promise <LiveVideoRequest> => {
  const response = await axios.get(`consult/live-requests/${id}/me`);
  return response.data;
}

export const startLiveVideoRequest = async(
  id: number
): Promise<{ dyte_auth_token: string }> => {
  const response = await axios.post(`consult/live-requests/${id}/start/`);
  return response.data
}

export const endLiveVideoRequest = async(
  id: number
): Promise<void> => {
  const response = await axios.post(`consult/live-requests/${id}/done/`)
  return response.data
}

export const getUserToken = async(
  id: number
): Promise<{ dyte_auth_token: string }> => {
  const response = await axios.get(`consult/live-requests/${id}/user-token/`);
  return response.data
}