import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TOKEN_KEY = "hmt_admin_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const adminApi = axios.create({ baseURL: API });
adminApi.interceptors.request.use((cfg) => {
  const t = getToken();
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});
adminApi.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) clearToken();
    return Promise.reject(err);
  }
);

export const login = async (email, password) => {
  const { data } = await axios.post(`${API}/auth/login`, { email, password });
  setToken(data.token);
  return data.user;
};

export const me = async () => {
  const { data } = await adminApi.get("/auth/me");
  return data;
};

export const listInquiries = async () => (await adminApi.get("/admin/inquiries")).data;
export const deleteInquiry = async (id) => (await adminApi.delete(`/admin/inquiries/${id}`)).data;
export const adminStats = async () => (await adminApi.get("/admin/stats")).data;

export const logout = () => clearToken();
