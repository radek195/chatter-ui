import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export const getChatroom = async () => {
    return await axios.get(`/api/chatroom`);
}