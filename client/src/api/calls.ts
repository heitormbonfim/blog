import store from "../redux/store";
import { RootState } from "../redux/store";

const url = "http://localhost:5000/v1";
interface ApiResponse {
  error: boolean;
  message: string;
  data?: any;
}

let authToken = "";

const handleTokenUpdate = () => {
  const state: RootState = store.getState();
  authToken = state.tokens.authToken;
};

handleTokenUpdate();

store.subscribe(handleTokenUpdate);

class ApiCalls {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async login({ email, password }: { email: string; password: string }): Promise<ApiResponse> {
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

  async loginWithToken(): Promise<ApiResponse> {
    try {
      const response = await fetch(this.url + "/login", {
        method: "GET",
        headers: {
          auth: authToken,
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

  async createBlog({
    name,
    description,
    ownerId,
  }: {
    name: string;
    description: string;
    ownerId: string;
  }): Promise<ApiResponse> {
    try {
      const response = await fetch(url + "/blog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          auth: authToken,
        },
        body: JSON.stringify({ name, description, owner_id: ownerId }),
      });

      return response.json();
    } catch (error) {
      return this.defaultError(error);
    }
  }

  async getBlogs(ownerId: string): Promise<ApiResponse> {
    try {
      const response = await fetch(url + "/blog/all/" + ownerId, {
        method: "GET",
        headers: {
          auth: authToken,
        },
      });

      return response.json();
    } catch (error) {
      return this.defaultError(error);
    }
  }

  private defaultError(error: unknown) {
    console.error(error);
    return {
      error: true,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

const api = new ApiCalls(url);
export default api;
