import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_HTTPS_BASE_URL;

export const getChatroom = async () => {
    return await axios.get(`/api/chatroom`);
}