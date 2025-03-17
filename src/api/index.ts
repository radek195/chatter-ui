import axios from 'axios';

axios.defaults.baseURL = `http://${import.meta.env.VITE_API_BASE_URL}`;

export const getChatroom = async () => {
    return await axios.get(`/api/chatroom`);
}