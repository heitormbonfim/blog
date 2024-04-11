const url = "http://localhost:5000/v1";

interface ApiResponse {
  error: boolean;
  message: string;
  data?: any;
}

const api = {
  login: async function ({
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
      return {
        error: true,
        message: error instanceof Error ? error.message : String(error),
      };
    }
  },
};

export default api;
