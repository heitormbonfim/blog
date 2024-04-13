const url = "http://localhost:5000/v1";
export let authToken = localStorage.getItem("auth") || "";

interface ApiResponse {
  error: boolean;
  message: string;
  data?: any;
}

const api = {
  setAuthToken(token: string) {
    authToken = token;
  },

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<ApiResponse> {
    try {
      const response = await fetch(url + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ email, password }),
      });

      return await response.json();
    } catch (error) {
      return defaultError(error);
    }
  },

  async loginWithToken(token: string): Promise<ApiResponse> {
    try {
      const response = await fetch(url + "/login", {
        method: "GET",
        headers: {
          auth: token,
        },
      });

      return response.json();
    } catch (error) {
      return defaultError(error);
    }
  },
};

function defaultError(error: unknown) {
  return {
    error: true,
    message: error instanceof Error ? error.message : String(error),
  };
}

export default api;
