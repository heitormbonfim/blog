const url = "http://localhost:5000/v1";
interface ApiResponse {
  error: boolean;
  message: string;
  data?: any;
}

class ApiRequests {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<ApiResponse> {
    try {
      const response = await fetch(this.url + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ email, password }),
      });

      return response.json();
    } catch (error) {
      return this.defaultError(error);
    }
  }

  async loginWithToken(token: string): Promise<ApiResponse> {
    try {
      const response = await fetch(this.url + "/login", {
        method: "GET",
        headers: {
          auth: token,
        },
      });

      return response.json();
    } catch (error) {
      return this.defaultError(error);
    }
  }

  async register({
    first,
    last,
    email,
    password,
  }: {
    first: string;
    last: string;
    email: string;
    password: string;
  }): Promise<ApiResponse> {
    try {
      const response = await fetch(url + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name: {
            first,
            last,
          },
          email,
          password,
        }),
      });

      return response.json();
    } catch (error) {
      return this.defaultError(error);
    }
  }

  private defaultError(error: unknown) {
    return {
      error: true,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

const api = new ApiRequests(url);
export default api;
