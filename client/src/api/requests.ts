import store from "../redux/store";
import { RootState } from "../redux/store";

export const url = "http://localhost:5000/v1";
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

class ApiRequests {
  private url: string;

  private defaultError(error: unknown) {
    console.error(error);
    return {
      error: true,
      message: error instanceof Error ? error.message : String(error),
    };
  }

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
  }: {
    name: string;
    description: string;
  }): Promise<ApiResponse> {
    try {
      const response = await fetch(url + "/blog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          auth: authToken,
        },
        body: JSON.stringify({ name, description }),
      });

      return response.json();
    } catch (error) {
      return this.defaultError(error);
    }
  }

  async getBlogs(): Promise<ApiResponse> {
    try {
      const response = await fetch(url + "/blog/all", {
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

  async updateBlog({
    _id,
    name,
    description,
  }: {
    _id: string;
    name: string;
    description: string;
  }): Promise<ApiResponse> {
    try {
      const response = await fetch(url + "/blog/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          auth: authToken,
        },
        body: JSON.stringify({ _id, name, description }),
      });

      return response.json();
    } catch (error) {
      return this.defaultError(error);
    }
  }

  async getBlogPosts(nameId: string): Promise<ApiResponse> {
    try {
      const response = await fetch(url + "/blog/" + nameId, {
        method: "GET",
      });

      return response.json();
    } catch (error) {
      return this.defaultError(error);
    }
  }

  async getPostFromBlog({
    blogNameId,
    postNameId,
  }: {
    blogNameId: string;
    postNameId: string;
  }): Promise<ApiResponse> {
    try {
      const response = await fetch(`${url}/blog/${blogNameId}/${postNameId}`, {
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

  async createNewPost({
    title,
    summary,
    author,
    content,
    blogId,
  }: {
    title: string;
    summary: string;
    author: string;
    content: string;
    blogId: string;
  }): Promise<ApiResponse> {
    try {
      const response = await fetch(url + "/blog/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          auth: authToken,
        },
        body: JSON.stringify({ title, summary, author, content, blog_id: blogId }),
      });

      return response.json();
    } catch (error) {
      return this.defaultError(error);
    }
  }

  async uploadFile(formData: FormData): Promise<ApiResponse> {
    try {
      const response = await fetch(url + "/files/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      return response.json();
    } catch (error) {
      return this.defaultError(error);
    }
  }

  async getPosts({ amount, skip }: { amount?: number; skip?: number }): Promise<ApiResponse> {
    try {
      const a = [amount, skip];
      const response = await fetch(`${url}/blog/`); //?amount=${amount}&skip=${skip}

      return response.json();
    } catch (error) {
      return this.defaultError(error);
    }
  }
}

const api = new ApiRequests(url);
export default api;