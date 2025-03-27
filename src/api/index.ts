import axios from 'axios';
import {PostUserRequest, PutPreferencesRequest} from "../types";

axios.defaults.baseURL = import.meta.env.VITE_HTTPS_BASE_URL;

export const getChatroom = async () => {
    return await axios.get(`/api/chatroom`);
}

export const postUser = async (body: PostUserRequest) => {
    return await axios.post<number>(`/api/user`, body);
}

export const putPreferences = async (id: number | undefined, body: PutPreferencesRequest) => {
    return await axios.put(`/api/user/${id}/preference`, body);
}
