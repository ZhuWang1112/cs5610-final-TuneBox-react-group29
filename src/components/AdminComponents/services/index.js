import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE = "http://localhost:4000/api";

export const findLatestUsers = async () => {
    const response = await axios.get(`${API_BASE}/users/admin/lastpage?limit=5`);
    return response.data;
}

export const countUsers = async () => {
    const response = await axios.get(`${API_BASE}/users/admin/count`);
    return response.data;
}
export const countPlaylists = async () => {
    const response = await axios.get(`${API_BASE}/playlists/admin/count`);
    return response.data;
};

export const countPremiumUsers = async () => {
    const response = await axios.get(`${API_BASE}/users/admin/vip/count`);
    return response.data;
};

export const countFemaleUsers = async () => {
    const response = await axios.get(`${API_BASE}/users/admin/female/count`);
    return response.data;
};

export const countMaleUsers = async () => {
    const response = await axios.get(`${API_BASE}/users/admin/male/count`);
    return response.data;
};

export const findLatestPlaylists = async () => {
    const response = await axios.get(`${API_BASE}/playlists/admin/lastpage?limit=3`);
    return response.data;
}