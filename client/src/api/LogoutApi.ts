import { requestAuth } from "./request";

export const userDelete = async (URL: string) => {
    try {
      const response = await requestAuth.delete(`/api${URL}`);
      const data = await response.data;
      sessionStorage.clear();
      localStorage.clear();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const logoutApi = async (URL: string) => {
    const res = await requestAuth.post(`/api/${URL}`);
    if (res.status !== 200) throw new Error(res.data.message || "logout error");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refresh");
    localStorage.clear();
    return res;
  };